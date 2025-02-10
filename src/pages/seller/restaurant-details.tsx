/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchRestaurantDetails } from "../../APIs/api";

const RestaurantDetails: React.FC = () => {
    const location = useLocation(); // Get current location object
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id"); // Extract 'id' from query params
    console.log(id);


    const [restaurant, setRestaurant] = useState<any>(null);

    useEffect(() => {
        if (id) {
            fetchDetails(id);
        }
    }, [id]);

    const fetchDetails = async (restaurantId: string) => {
        try {
            const response = await fetchRestaurantDetails(restaurantId);
            console.log("API Response:", response.data); // Log response to check format

            if (response.data && response.data.restaurants) {
                setRestaurant(response.data.restaurants[0]); // Take the first restaurant
            }
        } catch (error) {
            console.error("Error fetching restaurant details:", error);
        }
    };

    return (
        <div className="p-6">
            {restaurant ? (
                <div>
                    <div className="relative w-full h-48">
                        <img src={restaurant.image}
                            alt={restaurant.restaurantName}
                            className="relative w-full h-full object-cover rounded-t-lg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-t-lg"></div>
                        <h1 className="absolute bottom-1 left-4 text-3xl font-bold text-white">{restaurant.restaurantName}</h1>
                    </div>
                    <p>{restaurant.description}</p>
                    <h1>{restaurant.address}</h1>
                </div>
            ) : (
                <p>Loading restaurant details...</p>
            )}
        </div>
    );
};

export default RestaurantDetails;
