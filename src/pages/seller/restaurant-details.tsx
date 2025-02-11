/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { fetchCategories, addCategory, addMenuItem, fetchRestaurantDetails } from "../../APIs/api";
import { useLocation } from "react-router-dom";
import { useToast } from "../../hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";

const RestaurantDetails = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [menuItems, setMenuItems] = useState([]);
    const [restaurants, setRestaurants] = useState("");

    const location = useLocation();
    const { toast } = useToast();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id"); // Extract 'id' from query params

    useEffect(() => {
        if (id) {
            fetchDetails(id);
        }
        loadCategories();
    }, []);

    const fetchDetails = async (id?: string) => {
        try {
            const response = await fetchRestaurantDetails(id);

            if (response.data && response.data.restaurants) {
                setRestaurants(response.data.restaurants[0]); // Take the first restaurant
            }
        } catch (error) {
            console.error("Error fetching restaurant details:", error);
        }
    };


    const loadCategories = async () => {
        try {
            const response = await fetchCategories(id);
            setCategories(response.data.categories);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleAddCategory = async () => {
        if (!newCategory) return;
        try {
            const response = await addCategory({ restaurant_id: id, name: newCategory });

            if (response.data.success) {
                toast({
                    title: response.data.message
                })
                setNewCategory("");
                loadCategories();
            }

        } catch (error: any) {
            console.error("Error adding category:", error);
            toast({
                title: error.response.data.message,
                variant: "destructive"
            })
        }
    };

    const handleAddMenuItem = async () => {
        try {
            for (const item of menuItems) {

                const payload = {
                    restaurant_id: id,
                    category_id: selectedCategory,
                    ...item
                }
                const response =  await addMenuItem(payload);
                if(response.data.success){
                    toast({
                        title: response.data.message
                    })
                }

            }
            setMenuItems([]);
        } catch (error: any) {
            console.error("Error adding menu item:", error);
            toast({
                title: error.response.data.message,
                variant: "destructive"
            })
        }
    };

    const handleMenuItemChange = (index: number, key: string, value: string | File) => {
        const updatedItems = [...menuItems];
        updatedItems[index][key] = value;
        setMenuItems(updatedItems);
    };

    const addMenuItemField = () => {
        setMenuItems([...menuItems, { name: "", description: "", price: "", quantity: "", image: null }]);
    };

    return (


        <div className="p-6">
            <div>
                {restaurants ? (
                    <div>
                        <div className="relative w-full h-48">
                            <img src={restaurants.image}
                                alt={restaurants.restaurantName}
                                className="relative w-full h-full object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-lg"></div>
                            <h1 className="absolute bottom-1 left-4 text-3xl font-bold text-white">{restaurants.restaurantName}</h1>
                        </div>
                        <p>{restaurants.description}</p>
                        <h1>{restaurants.address}</h1>
                    </div>
                ) : (
                    <p>Loading restaurant details...</p>
                )}
            </div>

            <Dialog>
                <DialogTrigger>
                    <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 rounded-lg shadow-md py-2 px-4">
                        Add Menu
                    </Button>
                </DialogTrigger>
                <DialogContent className="overflow-auto w-full max-w-[650px] h-auto max-h-[90vh] p-6 rounded-lg shadow-lg bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">Add New Menu</DialogTitle>
                    </DialogHeader>

                    <div className="mb-4 flex flex-col gap-2">
                        <div className="flex gap-4">
                            <input
                                type="text"
                                placeholder="New Category"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                className="border px-2 w-1/2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                            <button
                                onClick={handleAddCategory}
                                className="bg-green-500 text-white px-2 py-2 rounded-md shadow-sm hover:bg-green-600 transition-colors duration-300">
                                Add Category
                            </button>
                        </div>

                        <select
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat.category_id} value={cat.category_id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-6">
                        {menuItems.map((item, index) => (
                            <div key={index} className="flex flex-col gap-4 mb-4 border p-4 rounded-lg shadow-sm bg-gray-50">
                                <input
                                    type="text"
                                    placeholder="Item Name"
                                    value={item.name}
                                    onChange={(e) => handleMenuItemChange(index, "name", e.target.value)}
                                    className="border p-2 w-1/4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <input
                                    type="text"
                                    placeholder="Description"
                                    value={item.description}
                                    onChange={(e) => handleMenuItemChange(index, "description", e.target.value)}
                                    className="border p-2 w-2/4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <input
                                    type="number"
                                    placeholder="Price"
                                    value={item.price}
                                    onChange={(e) => handleMenuItemChange(index, "price", e.target.value)}
                                    className="border p-2 w-3/4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <input
                                    type="number"
                                    placeholder="Quantity"
                                    value={item.quantity}
                                    onChange={(e) => handleMenuItemChange(index, "quantity", e.target.value)}
                                    className="border p-2 w-4/4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <input
                                    type="file"
                                    accept=".jpeg,.png,.jpg"
                                    onChange={(e) => handleMenuItemChange(index, "image", e.target.files[0])}
                                    className="border p-2 w-full rounded-md shadow-sm focus:outline-none"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex gap-4 justify-start">
                        <Button
                            onClick={addMenuItemField}
                            className="bg-blue-500 text-white shadow-sm hover:bg-blue-600 transition-colors duration-300"
                        >
                            + Add Item
                        </Button>
                        <Button
                            onClick={handleAddMenuItem}
                            className="bg-indigo-500 text-white shadow-sm hover:bg-indigo-600 transition-colors duration-300"
                        >
                            Submit Menu
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>


        </div>
    );
};

export default RestaurantDetails;
