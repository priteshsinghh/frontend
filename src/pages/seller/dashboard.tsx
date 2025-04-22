/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useToast } from "../../hooks/use-toast";
import { Clock, DollarSign, MapPin, Phone, Utensils } from "lucide-react";
import { addRestaurant, deleteRestaurant, fetchRestaurant } from "../../APIs/api";
import { useNavigate } from "react-router-dom";

const SellerDashboard: React.FC = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        restaurantName: "",
        description: "",
        address: "",
        contactDetails: "",
        openingHour: "",
        closingHour: "",
        cuisineType: "",
        deliveryFee: "",
        image: null,
    });
    const { toast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            const response = await fetchRestaurant();
            setRestaurants(response.data.restaurants);
            setOpen(false)

        } catch (error) {
            console.error("Error fetching restaurants:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setForm({ ...form, image: e.target.files[0] });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, value as string | Blob);
        });

        try {
            const response = await addRestaurant(formData);
            fetchRestaurants();
            if (response.data.success) {
                toast({
                    title: response.data.message
                })
            } else {
                toast({
                    title: response.data.message,
                    variant: "destructive"
                })
            }
        } catch (error) {
            console.error("Error adding restaurant:", error);
        }
    };

    const handelDelete = async (id: any) => {
        try {

            console.log(id);

            const response = await deleteRestaurant(id)
            
            if (response.data.success) {
                toast({
                    title: response.data.message,
                })
                fetchRestaurant();
            }

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className="p-6 lg:px-24">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="mb-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-700 transition-all duration-300">
                        Add Restaurant
                    </Button>

                </DialogTrigger>
                <DialogContent className="overflow-auto scroll-smooth w-full max-w-[650px] h-auto max-h-[90vh] p-4 sm:p-6 rounded-lg no-scrollbar">

                    <DialogHeader>
                        <DialogTitle>Add a New Restaurant</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-2">

                        <div>
                            <label>Name: </label>
                            <input
                                type="text"
                                name="restaurantName"
                                placeholder="Restaurant Name"
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label>Description: </label>
                            <textarea
                                name="description"
                                placeholder="Description"
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="">Address: </label>
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="contactDetails">Contact: </label>
                            <input
                                type="text"
                                name="contactDetails"
                                placeholder="Contact Details"
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="openingHour">Opening Time: </label>
                            <input type="time"
                                name="openingHour"
                                placeholder="Opening Hour"
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                            <label htmlFor="closingHour">Closing Time: </label>
                            <input type="time"
                                name="closingHour"
                                placeholder="Closing Hour"
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="cuisineType">Cuisine Type: </label>
                            <input type="text"
                                name="cuisineType"
                                placeholder="Cuisine Type"
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="deliveryFee">Delivery Fee:</label>
                            <input
                                type="number"
                                name="deliveryFee"
                                placeholder="Delivery Fee"
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="">Select Image: </label>
                            <input
                                type="file"
                                name="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                            Submit
                        </button>
                    </form>
                </DialogContent>
            </Dialog>

            {restaurants.length === 0 ? (
                <div
                    className="w-full h-96 flex flex-col text-start bg-cover bg-center text-white "
                    style={{ backgroundImage: `url('/restaurant.png')` }}
                >
                    <div className="mt-3">
                        <h2 className="text-2xl font-bold text-black">No Restaurants Available</h2>
                        <p className="mt-2 text-lg text-gray-700">Click "Add Restaurant" to get started!</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                    {restaurants.map((restaurant, index) => (
                        <Card key={index} className="rounded-2xl overflow-hidden shadow-lg transition-transform transform hover:scale-[1.03] hover:shadow-2xl bg-white">
                            {/* Image Section with Overlay */}
                            <div className="relative w-full h-48">
                                <img
                                    src={restaurant.image}
                                    alt={restaurant.restaurantName}
                                    className=" relative w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                <h1 className="absolute bottom-1 left-2 text-2xl font-bold text-white">{restaurant.restaurantName}</h1>
                            </div>



                            <CardContent className="">
                                <div className="flex justify-between my-2">
                                    <div>
                                        <p className="flex items-center gap-1">
                                            <Clock size={18} className="text-blue-500" />
                                            <span>{restaurant.openingHour} - {restaurant.closingHour}</span>
                                        </p>
                                        <p className="flex items-center gap-1">
                                            <DollarSign size={18} className="text-yellow-500" />
                                            <span> ${restaurant.deliveryFee}</span>
                                        </p>

                                    </div>

                                    <div>
                                        <p className="flex items-center gap-1">
                                            <MapPin size={18} className="text-indigo-500" />
                                            <span>{restaurant.address}</span>
                                        </p>
                                        <p className="flex items-center gap-1">
                                            <Phone size={18} className="text-green-500" />
                                            <span> {restaurant.contactDetails}</span>
                                        </p>
                                    </div>
                                </div>

                                <hr></hr>

                                <div className="flex flex-col my-2">
                                    <p className="flex items-center gap-1">
                                        <Utensils size={18} className="text-red-500" />
                                        <span> {restaurant.cuisineType}</span>
                                    </p>
                                    <p className="text-gray-600 text-sm">{restaurant.description}</p>
                                </div>

                                <div className="flex justify-between gap-8 pt-2">
                                    <Button
                                        onClick={() => navigate(`/seller/restaurant-details?id=${restaurant.restaurant_id}`)}
                                        className=" bg-indigo-500 text-white  text-base font-semibold hover:bg-indigo-600 transition-all">
                                        View Details
                                    </Button>
                                    <Button
                                        onClick={() => handelDelete(restaurant.restaurant_id)}
                                        className="  bg-red-500 text-white  text-base font-semibold hover:bg-indigo-600 transition-all">
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                    ))}
                </div>
            )}
        </div>
    );
};

export default SellerDashboard;
