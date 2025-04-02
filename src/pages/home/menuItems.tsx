/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {
  fetchCategories,
  fetchRestaurantDetails,
  fetchMenu,
} from "../../APIs/api";
import { useLocation } from "react-router-dom";
import { MapPin, PhoneCall } from "lucide-react";

const MenuItems = () => {
  const [restaurants, setRestaurants] = useState("");
  const [menuCategories, setMenuCategories] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id"); // Extract 'id' from query params

  useEffect(() => {
    if (id) {
      fetchDetails(id);
      fetchMenuCategories(id);
      loadCategories();
    }
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
        setMenuCategories(response.data.categories);
      }
    } catch (error) {
      console.error("Error fetching restaurant details:", error);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await fetchCategories(id);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
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
                <h1 className="text-2xl md:text-4xl font-bold tracking-wide">
                  {restaurants.restaurantName}
                </h1>
                <p className="text-lg md:text-xl italic">
                  {restaurants.cuisineType}
                </p>
              </div>
            </div>

            <div className="container p-6 lg:px-24 flex flex-col gap-3">
              <h1 className="font-bold flex gap-1 items-center text-gray-700">
                <MapPin className="w-5 h-5" /> {restaurants.address}
              </h1>
              <div className="flex gap-2">
                <h2 className="pr-2 text-gray-600 border-r border-r-black">
                  Closing at {restaurants.closingHour}
                </h2>
                <h2 className="text-gray-600 border-r border-r-black pr-2">
                  Starting delivery from ₹{restaurants.deliveryFee}
                </h2>
                <h2 className="flex gap-1 text-gray-600 items-center">
                  <PhoneCall className="h-5 w-5" /> {restaurants.contactDetails}
                </h2>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg mt-6">
            Loading restaurant details...
          </p>
        )}
      </div>

      <div className="container p-6 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {menuCategories.length > 0 ? (
            menuCategories.map((category) => (
              <div
                key={category.category_id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="flex items-center justify-between bg-indigo-500 text-white px-4 py-2 uppercase font-serif italic">
                  {category.name}
                </div>
                <ul className="divide-y divide-gray-200">
                  {category.menu_items.length === 0 ? (
                    <li className="p-4 text-gray-500">No items available</li>
                  ) : (
                    category.menu_items.map((item) => (
                      <li
                        key={item.menuItem_id}
                        className="p-4 flex justify-between items-start"
                      >
                        <div>
                          <h2 className="text-md font-semibold uppercase font-mono text-gray-800 italic">
                            {item.name}
                          </h2>
                          <p className="text-sm text-gray-600">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex flex-col fle">
                          <span className="text-md font-semibold text-gray-800 font-mono">
                            ₹{item.price}
                          </span>
                          <span className="text-sm text-gray-800">
                            {item.quantity}
                          </span>
                        </div>
                        <div>
                            <img 
                            src={item.image} 
                            alt="item image" />
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No Menu Available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItems;
