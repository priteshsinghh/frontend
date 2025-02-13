/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { fetchCategories, addCategory, addMenuItem, fetchRestaurantDetails, fetchMenu } from "../../APIs/api";
import { useLocation } from "react-router-dom";
import { useToast } from "../../hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import { Input } from "../../components/ui/input";
import { MapPin, PhoneCall } from "lucide-react";

const RestaurantDetails = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [menuItems, setMenuItems] = useState([]);
    const [restaurants, setRestaurants] = useState("");
    const [menuCategories, setMenuCategories] = useState("");
    const [open, setOpen] = useState(false);

    const location = useLocation();
    const { toast } = useToast();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id"); // Extract 'id' from query params

    useEffect(() => {
        if (id) {
            fetchDetails(id);
            fetchMenuCategories(id);
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

    const fetchMenuCategories = async (id?: string) => {
        try {

            const response = await fetchMenu(id);

            if (response.data && response.data.categories) {
                setMenuCategories(response.data.categories)
                setOpen(false)
            }

        } catch (error) {
            console.error("Error fetching restaurant details:", error);
        }
    }

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
                const response = await addMenuItem(payload);
                if (response.data.success) {
                    toast({
                        title: response.data.message
                    })
                }

            }
            loadCategories();
            fetchMenuCategories(id);
            setOpen(false);
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

        <div className="flex flex-col">

            <div className="w-full mx-auto mb-3">
                {restaurants ? (
                    <div>
                        <div className="relative w-full h-64 md:h-80 lg:h-[400px] overflow-hidden shadow-lg">
                            {/* Background Image */}
                            <img
                                src={restaurants.image}
                                alt={restaurants.restaurantName}
                                className="absolute w-full h-full object-cover"
                            />

                            {/* Gradient Overlay for Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                            {/* Restaurant Details Overlay */}
                            <div className="absolute bottom-6 left-6 md:left-12 text-white">
                                <h1 className="text-2xl md:text-4xl font-bold tracking-wide">{restaurants.restaurantName}</h1>
                                <p className="text-lg md:text-xl italic">{restaurants.cuisineType}</p>
                            </div>
                        </div>

                        <div className="container p-6 lg:px-24 flex flex-col gap-3">
                            <h1 className="font-bold flex gap-1 items-center text-gray-700"> <MapPin className="w-5 h-5" /> {restaurants.address}</h1>
                            <div className="flex gap-2">
                                <h2 className="pr-2 text-gray-600 border-r border-r-black">Closing at {restaurants.closingHour}</h2>
                                <h2 className="text-gray-600 border-r border-r-black pr-2"> Starting delivery from ₹{restaurants.deliveryFee} </h2>  
                                <h2 className="flex gap-1 text-gray-600 items-center"> <PhoneCall className="h-5 w-5" /> {restaurants.contactDetails} </h2>
                            </div>
                        </div>

                    </div>
                ) : (
                    <p className="text-center text-gray-600 text-lg mt-6">Loading restaurant details...</p>
                )}
            </div>


            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                    <div className="flex justify-start lg:px-24 px-6">
                        <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg transform hover:scale-105">
                            Add Menu
                        </Button>
                    </div>
                </DialogTrigger>
                <DialogContent className="overflow-auto w-full max-w-[800px] h-auto max-h-[90vh] p-8 rounded-lg shadow-xl bg-gradient-to-r from-white to-gray-100 transition-all duration-300">
                    <DialogHeader className="mb-4">
                        <DialogTitle className="text-2xl font-bold text-center text-purple-800">Add New Menu</DialogTitle>
                    </DialogHeader>

                    <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:gap-6">
                        <div className="flex flex-1 gap-4">
                            <Input
                                type="text"
                                placeholder="New Category"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                className=""
                            />
                            <Button
                                onClick={handleAddCategory}
                                className="bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600 transition-colors duration-300">
                                Add Category
                            </Button>
                        </div>

                        <select
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black w-full sm:w-1/2"
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat.category_id} value={cat.category_id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <Accordion type="multiple" className="mt-6">
                        {menuItems.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="my-3">
                                <AccordionTrigger className="text-lg font-semibold bg-purple-200 p-3 rounded-t-lg shadow-sm hover:bg-purple-300 transition-all duration-200">
                                    Menu Item {index + 1}
                                </AccordionTrigger>
                                <AccordionContent className="border p-6 bg-gray-50">
                                    <Input
                                        type="text"
                                        placeholder="Item Name"
                                        value={item.name}
                                        onChange={(e) => handleMenuItemChange(index, "name", e.target.value)}
                                        className="border p-4 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Description"
                                        value={item.description}
                                        onChange={(e) => handleMenuItemChange(index, "description", e.target.value)}
                                        className="mt-3"
                                    />
                                    <Input
                                        type="number"
                                        placeholder="Price"
                                        value={item.price}
                                        onChange={(e) => handleMenuItemChange(index, "price", e.target.value)}
                                        className="mt-3"
                                    />
                                    <Input
                                        type="number"
                                        placeholder="Quantity"
                                        value={item.quantity}
                                        onChange={(e) => handleMenuItemChange(index, "quantity", e.target.value)}
                                        className="mt-3"
                                    />
                                    <Input
                                        type="file"
                                        accept=".jpeg,.png,.jpg"
                                        onChange={(e) => handleMenuItemChange(index, "image", e.target.files[0])}
                                        className="mt-3"
                                    />
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <div className="mt-8 flex gap-4 justify-between sm:justify-start">
                        <Button
                            onClick={addMenuItemField}
                            className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-sm hover:bg-blue-600 transition-all duration-300 transform hover:scale-105">
                            + Add Item
                        </Button>
                        <Button
                            onClick={handleAddMenuItem}
                            className="bg-indigo-500 text-white py-3 px-6 rounded-lg shadow-sm hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105">
                            Submit Menu
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>


            <div className="container p-6 lg:px-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {menuCategories.length === 0 ? (
                        <p className="text-gray-500">No Menu Available. Click <strong>Add Menu</strong> to add.</p>
                    ) : (
                        menuCategories.map((category) => (
                            <div key={category.category_id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="bg-indigo-500 text-white px-4 py-2 uppercase font-serif italic">
                                    {category.name}
                                </div>
                                <ul className="divide-y divide-gray-200">
                                    {category.menu_items.length === 0 ? (
                                        <li className="p-4 text-gray-500">No items available</li>
                                    ) : (
                                        category.menu_items.map((item) => (
                                            <li key={item.menuItem_id} className="p-4 flex justify-between items-start">
                                                <div>
                                                    <h2 className="text-md font-semibold uppercase font-mono text-gray-800 italic">{item.name}</h2>
                                                    <p className="text-xs text-gray-600">( {item.description} )</p>
                                                </div>
                                                <span className="text-md font-semibold text-gray-800 font-mono">₹{item.price}</span>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>
                        ))
                    )}
                </div>
            </div>



        </div>
    );
};

export default RestaurantDetails;
