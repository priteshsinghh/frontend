/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { fetchCategories, addCategory, addMenuItem, fetchRestaurantDetails, fetchMenu, editMenu, deleteCategory, deleteMenuItem, editCategory } from "../../APIs/api";
import { useLocation } from "react-router-dom";
import { useToast } from "../../hooks/use-toast";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { MapPin, Pen, PhoneCall, Trash2, X } from "lucide-react";
import { Label } from "../../components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import { Separator } from "../../components/ui/separator";


const RestaurantDetails = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [newEditCategory, setNewEditCategory] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [menuItems, setMenuItems] = useState([]);
    const [restaurants, setRestaurants] = useState("");
    const [menuCategories, setMenuCategories] = useState("");
    const [open, setOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedCategory1, setSelectedCategory1] = useState(null);
    const [menuItems1, setMenuItems1] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const location = useLocation();
    const { toast } = useToast();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id"); // Extract 'id' from query params

    useEffect(() => {
        if (id) {
            fetchDetails(id);
            fetchMenuCategories(id);
        }
        setNewEditCategory(selectedCategory1?.name || "");
        loadCategories();
    }, [selectedCategory1]);

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
        try {
            const response = await addCategory({ restaurant_id: id, name: newCategory });

            if (response.data.success) {
                toast({
                    title: response.data.message
                })
                loadCategories();
                fetchMenuCategories(id);
                setOpen(false)
                setNewCategory("");
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
            setDialogOpen(false);
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

    const handleEditMenuItems = (categoryId) => {
        // Find the category by categoryId
        const category = menuCategories.find((cat) => cat.category_id === categoryId);

        // Set the category and its items to state
        setSelectedCategory1(category);
        setMenuItems1(category.menu_items);

        // Open the modal
        setIsModalOpen(true);
    };

    const handleEditMenuItemChange = (index, field, value) => {
        const updatedItems = [...menuItems1];
        updatedItems[index] = { ...updatedItems[index], [field]: value };
        setMenuItems1(updatedItems);
    };


    const handleSaveChanges = async (categoryId) => {
        try {
            const formData = new FormData();
            formData.append("id", selectedCategory1.category_id);

            menuItems1.forEach((item, index) => {
                formData.append(`menuItems[${index}][restaurant_id]`, item.restaurant_id);
                formData.append(`menuItems[${index}][category_id]`, item.category_id);
                formData.append(`menuItems[${index}][menuItem_id]`, item.menuItem_id);
                formData.append(`menuItems[${index}][name]`, item.name);
                formData.append(`menuItems[${index}][description]`, item.description);
                formData.append(`menuItems[${index}][price]`, item.price);
                formData.append(`menuItems[${index}][quantity]`, item.quantity);

                if (item.image instanceof File) {
                    formData.append("image", item.image); // Use same field name for images
                }
            });
            const response = await editMenu(formData); // API call to save changes
            const response2 = await editCategory({ id: categoryId, name: newEditCategory })

            if (response.data.success && response2.data.success) {
                toast({
                    title: response.data.message
                });
                setIsModalOpen(false);
                loadCategories();
                fetchMenuCategories(selectedCategory1.restaurant_id);
                setOpen(false)
                setNewEditCategory(setNewEditCategory.name);
            }

        } catch (error) {
            console.error("Error saving changes:", error);
            toast({
                title: error.response?.data?.message || 'Error saving menu items',
                variant: 'destructive'
            });
        }
    };


    const handleDeleteCategory = async (catId, restId) => {
        try {

            console.log(id);

            const response = await deleteCategory(catId);

            if (response.data.success) {
                toast({
                    title: response.data.message
                })
            }
            console.log(restId);

            loadCategories();
            fetchMenuCategories(restId);


        } catch (error) {
            console.log(error);
            toast({
                title: error.response.data.message,
                variant: "destructive"
            })
        }
    }

    const handleDeleteMenuItem = async (itemId, restId) => {
        try {

            const response = await deleteMenuItem(itemId);

            if (response.data.success) {
                toast({
                    title: response.data.message
                })
            }

            loadCategories();
            fetchMenuCategories(restId);

        } catch (error) {
            console.log(error);
            toast({
                title: error.response.data.message,
                variant: "destructive"
            })
        }
    }

    const handleCloseAccordion = (index) => {
        const updatedItems = menuItems.filter((_, i) => i !== index);
        setMenuItems(updatedItems);
    }

    function resetMenuForm() {
        setSelectedCategory("");
        setMenuItems([]);
    }

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

            <div className="flex px-6 lg:px-24 gap-4">

                {/* Modal for menu category */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger>
                        <Button className="bg-gradient-to-r from-indigo-500 to-indigo-950 hover:bg-slate-400 transition-colors duration-300">
                            {menuCategories.length === 0 ? "Add Menu Category" : "Add More Category"}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="overflow-auto p-8 rounded-lg shadow-xl bg-gradient-to-r from-white to-gray-100 transition-all duration-300">
                        <DialogHeader className="mb-4">
                            <DialogTitle className="text-2xl font-bold text-center text-indigo-500">Add New Menu</DialogTitle>
                        </DialogHeader>

                        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:gap-6">
                            <div className="flex flex-1 gap-4">

                                <Input
                                    type="text"
                                    placeholder="New Category"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    className=""
                                    required
                                />
                                <Button
                                    onClick={handleAddCategory}
                                    className="bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600 transition-colors duration-300">
                                    Add Category
                                </Button>

                            </div>

                        </div>
                    </DialogContent>
                </Dialog>

                {/* Modal for menu items */}
                <Dialog open={dialogOpen} onOpenChange={(isOpen => {setDialogOpen(isOpen); if(!isOpen){resetMenuForm()}})}>
                    <DialogTrigger>
                        <Button className={` ${menuCategories.length === 0 ? "hidden" : ""} bg-gradient-to-l from-indigo-500 to-indigo-950`}>
                            {menuCategories.length === 0 ? "Add menu Item" : "Edit Menu"}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="lg:max-h-[650px] max-h-96 flex flex-col p-0">
                        <DialogHeader className="sticky pt-4">
                            <DialogTitle className="flex justify-center">Add Menu Item</DialogTitle>
                            <div className="flex justify-center">
                                <select
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black w-full sm:w-1/2"
                                >
                                    <option value="">Select Category</option>
                                    {categories.length === 0
                                        ? "not category available"
                                        : categories.map((cat) => (
                                            <option key={cat.category_id} value={cat.category_id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </DialogHeader>

                        <Separator />

                        <div className="overflow-y-auto no-scrollbar flex-1 lg:max-h-[650px] px-4">
                            <Accordion type="multiple" className="">
                                {menuItems.map((item, index) => (
                                    <AccordionItem key={index} value={`item-${index}`} className="mt-3">
                                        <div className="flex items-center">
                                            <AccordionTrigger className="text-lg lg:min-w-[478px] w-full font-semibold p-3 rounded-t-lg shadow-sm hover:no-underline bg-purple-200 hover:bg-purple-300 transition-all duration-200">
                                                Menu Item {index + 1}
                                                <button
                                                    onClick={() => handleCloseAccordion(index)}
                                                    className="relative left-36  text-red-500 hover:text-red-700 transition-all duration-200"
                                                    aria-label="Close"
                                                >
                                                    <X size={20} />
                                                </button>
                                            </AccordionTrigger>
                                        </div>

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
                                                type="text"
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
                        </div>

                        <Separator />

                        <DialogFooter className="sticky px-4 pb-4">
                            <div className="flex gap-4 justify-between sm:justify-start">
                                <Button
                                    onClick={addMenuItemField}
                                    className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-sm hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
                                >
                                    + Add Item
                                </Button>
                                <Button
                                    onClick={handleAddMenuItem}
                                    className="bg-indigo-500 text-white py-3 px-6 rounded-lg shadow-sm hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105"
                                >
                                    Submit Menu
                                </Button>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>



                {/* modal for edit items */}
                <Dialog open={isModalOpen} onOpenChange={() => setIsModalOpen(false)}>
                    <DialogContent className="lg:max-h-[650px] max-h-96 flex flex-col p-0">
                        <DialogHeader className="pt-3">
                            <div className="flex justify-center flex-col items-center gap-5">
                                <DialogTitle>Edit Menu Items</DialogTitle>
                                {/* <h3 className="text-lg font-semibold">{selectedCategory1?.name}</h3> */}
                                <Input
                                    type="text"
                                    value={newEditCategory}
                                    onChange={(e) => setNewEditCategory(e.target.value)}
                                    className="w-2/4"
                                />
                            </div>

                        </DialogHeader>

                        <Separator />

                        <div className="overflow-y-auto no-scrollbar flex-1 lg:max-h-[650px] px-4">
                            <Accordion type="multiple" className="mt-6">
                                {menuItems1.map((menu, index) => (
                                    <AccordionItem key={menu.menuItem_id} value={`item-${index}`} className="my-3">
                                        <AccordionTrigger className="text-lg font-semibold bg-indigo-200 p-3 rounded-t-lg hover:no-underline shadow-sm hover:bg-indigo-300 transition-all duration-200">
                                            {menu.name}
                                        </AccordionTrigger>
                                        <AccordionContent className="border p-6 bg-gray-50">
                                            <div className="flex flex-col gap-4">
                                                <div className="flex flex-col gap-2">
                                                    <Label>Name: </Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Item Name"
                                                        value={menu.name}
                                                        onChange={(e) => handleEditMenuItemChange(index, "name", e.target.value)}
                                                        className=""
                                                    />
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <Label>Description: </Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Description"
                                                        value={menu.description}
                                                        onChange={(e) => handleEditMenuItemChange(index, "description", e.target.value)}
                                                        className=""
                                                    />
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <Label>Price: </Label>
                                                    <Input
                                                        type="number"
                                                        placeholder="Price"
                                                        value={menu.price}
                                                        onChange={(e) => handleEditMenuItemChange(index, "price", e.target.value)}
                                                        className=""
                                                    />
                                                </div>

                                                <div className="flex flex-col gap-2"> 
                                                    <Label>Quantity: </Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Quantity"
                                                        value={menu.quantity}
                                                        onChange={(e) => handleEditMenuItemChange(index, "quantity", e.target.value)}
                                                        className=""
                                                    />
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <Label>Add Image: </Label>

                                                    {/* Display current image if it exists */}
                                                    {menu.image && (
                                                        <div>
                                                            <img
                                                                src={menu.image}
                                                                alt="Current Uploaded"
                                                                style={{ maxWidth: '100px', maxHeight: '100px' }}
                                                                className="rounded-lg p-2 object-contain"
                                                            />
                                                        </div>
                                                    )}

                                                    {/* File input to select a new image */}
                                                    <Input
                                                        type="file"
                                                        accept=".jpeg,.png,.jpg"
                                                        onChange={(e) => handleEditMenuItemChange(index, "image", e.target.files[0])}
                                                        className=""
                                                    />
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>

                        <Separator />

                        <DialogFooter className="stickey px-4 pb-4">
                            <div className="flex gap-4 justify-between sm:justify-start">
                                <Button
                                    onClick={() => handleSaveChanges(selectedCategory1?.category_id)}  // Handle save changes function
                                    className="bg-indigo-500 text-white py-3 px-6 rounded-lg shadow-sm hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105">
                                    Save Changes
                                </Button>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </div>


            <div className="container p-6 lg:px-24">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {menuCategories.length > 0 ?
                        (
                            menuCategories.map((category) => (
                                <div key={category.category_id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="flex items-center justify-between bg-indigo-500 text-white px-4 py-2 uppercase font-serif italic">
                                        {category.name}
                                        <div className="flex gap-4">
                                            <button onClick={() => handleEditMenuItems(category.category_id)} className={`border p-1 rounded-full bg-gray-200 hover:bg-gray-500 ${category.menu_items.length > 0 ? "" : "hidden"}`}>
                                                <Pen size={15} className="text-black cursor-pointer hover:text-white" />
                                            </button>

                                            <button onClick={() => handleDeleteCategory(category.category_id, category.restaurant_id)} className="border p-1 rounded-full bg-gray-200 hover:bg-red-500">
                                                <Trash2 size={15} className="text-black cursor-pointer hover:text-white" />
                                            </button>
                                        </div>
                                    </div>
                                    <ul className="divide-y divide-gray-200">
                                        {category.menu_items.length === 0 ? (
                                            <li className="p-4 text-gray-500">No items available</li>
                                        ) : (
                                            category.menu_items.map((item) => (
                                                <li key={item.menuItem_id} className="p-4 flex justify-between items-start">
                                                    <div>
                                                        <h2 className="text-md font-semibold uppercase font-mono text-gray-800 italic">{item.name}</h2>
                                                        <p className="text-xs text-gray-600">{item.description}</p>
                                                    </div>
                                                    <div className="flex gap-4">
                                                        <span className="text-md font-semibold text-gray-800 font-mono">₹{item.price}</span>
                                                        <button onClick={() => handleDeleteMenuItem(item.menuItem_id, item.restaurant_id)}>
                                                            <Trash2 size={20} className="text-black cursor-pointer hover:text-red-500 transition-all duration-300 transform hover:scale-110" />
                                                        </button>
                                                    </div>
                                                </li>
                                            ))
                                        )}
                                    </ul>
                                </div>
                            ))
                        )
                        : (
                            <p className="text-gray-500">No Menu Available. Click <strong>Add Menu Category</strong> to add.</p>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default RestaurantDetails;
