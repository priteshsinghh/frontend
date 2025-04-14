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
      return response
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Menu Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
            Our Menu
          </h1>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Seasonal offerings crafted with locally-sourced ingredients
          </p>
        </div>

        {/* Menu Categories */}
        <div className="grid gap-12">
          {menuCategories.length > 0 ? (
            menuCategories.map((category) => (
              <section key={category.category_id} className="relative">
                {/* Category Header with decorative elements */}
                <div className="flex items-center mb-8">
                  <div className="flex-grow border-t border-amber-200"></div>
                  <h2 className="px-4 text-2xl font-bold text-gray-800 text-center uppercase font-mono">
                    {category.name}
                  </h2>
                  <div className="flex-grow border-t border-amber-200"></div>
                </div>

                {/* Menu Items Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                  {category.menu_items.length === 0 ? (
                    <div className="col-span-2 text-center py-12 text-gray-500 italic">
                      Coming soon - new dishes in development
                    </div>
                  ) : (
                    category.menu_items.map((item) => (
                      <div
                        key={item.menuItem_id}
                        className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                      >
                        <div className="flex flex-col h-full cursor-pointer">
                          {/* Item Image with hover effect */}
                          {item.image && (
                            <div className="relative overflow-hidden h-48">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                          )}

                          {/* Item Details */}
                          <div className="p-6 flex flex-col flex-grow">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-xl font-serif font-bold text-gray-800">
                                {item.name}
                              </h3>
                              <span className="text-lg font-medium text-amber-600 whitespace-nowrap ml-4">
                                ₹{item.price}
                              </span>
                            </div>

                            {item.quantity && (
                              <div className="text-sm text-amber-700 mb-3 font-medium">
                                {item.quantity}
                              </div>
                            )}

                            {item.description && (
                              <p className="text-gray-600 mt-2 mb-4 flex-grow">
                                {item.description}
                              </p>
                            )}

                            {/* Dietary Tags */}
                            {item.tags && (
                              <div className="flex flex-wrap gap-2 mt-4">
                                {item.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            ))
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🍴</div>
              <h3 className="text-2xl font-serif text-gray-800 mb-2">
                Menu Coming Soon
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                We're currently curating an exceptional dining experience for
                you. Please check back later.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItems;
