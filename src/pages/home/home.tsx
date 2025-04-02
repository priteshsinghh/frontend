import {
  AppleIcon,
  BaggageClaim,
  BikeIcon,
  Calculator,
  Clock,
  CookingPot,
  DollarSign,
  MapPin,
  PaletteIcon,
  Phone,
  Utensils,
  Wallet,
} from "lucide-react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import React, { useEffect, useState } from "react";
import { fetchRestaurant } from "../../APIs/api";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

interface Dish {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
}

const dishes: Dish[] = [
  {
    id: 1,
    name: "Grilled Steak with Asparagus",
    image: "/menu1.png",
    description:
      "Nullam laoreet arcu eu massa euismod, quis dictum massa sodales. Proin eget scelerisque dui. Phasellus id enim lobortis, porta orci at, viverra turpis.",
    price: 12, // Replace with real URLs
  },
  {
    id: 2,
    name: "Chicken Soup",
    image: "/menu_2.png",
    description:
      "Nullam laoreet arcu eu massa euismod, quis dictum massa sodales. Proin eget scelerisque dui. Phasellus id enim lobortis, porta orci at, viverra turpis.",
    price: 12,
  },
  {
    id: 3,
    name: "Healthy Bowl",
    image: "/menu_3.png",
    description:
      "Nullam laoreet arcu eu massa euismod, quis dictum massa sodales. Proin eget scelerisque dui. Phasellus id enim lobortis, porta orci at, viverra turpis.",
    price: 12,
  },
  {
    id: 4,
    name: "Grilled Chicken with Veggies",
    image: "/menu_4.png",
    description:
      "Nullam laoreet arcu eu massa euismod, quis dictum massa sodales. Proin eget scelerisque dui. Phasellus id enim lobortis, porta orci at, viverra turpis.",
    price: 12,
  },
  {
    id: 5,
    name: "Grilled Steak with Asparagus",
    image: "/menu_5.png",
    description:
      "Nullam laoreet arcu eu massa euismod, quis dictum massa sodales. Proin eget scelerisque dui. Phasellus id enim lobortis, porta orci at, viverra turpis.",
    price: 12, // Replace with real URLs
  },
  {
    id: 6,
    name: "Chicken Soup",
    image: "/menu_6.png",
    description:
      "Nullam laoreet arcu eu massa euismod, quis dictum massa sodales. Proin eget scelerisque dui. Phasellus id enim lobortis, porta orci at, viverra turpis.",
    price: 12,
  },
  {
    id: 7,
    name: "Healthy Bowl",
    image: "/menu_7.png",
    description:
      "Nullam laoreet arcu eu massa euismod, quis dictum massa sodales. Proin eget scelerisque dui. Phasellus id enim lobortis, porta orci at, viverra turpis.",
    price: 12,
  },
  {
    id: 8,
    name: "Grilled Chicken with Veggies",
    image: "/menu_8.png",
    description:
      "Nullam laoreet arcu eu massa euismod, quis dictum massa sodales. Proin eget scelerisque dui. Phasellus id enim lobortis, porta orci at, viverra turpis.",
    price: 12,
  },
];

const Home: React.FC = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await fetchRestaurant();
      console.log(response.data.restaurants);

      setRestaurants(response.data.restaurants);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div
        className="flex flex-wrap items-center justify-end gap-3 bg-cover bg-center bg-no-repeat text-white p-6 min-h-screen"
        style={{
          backgroundImage: "url('/homebg.jpg')", // Replace with the correct image path
        }}
      >
        <div className="flex flex-wrap items-center justify-end w-[500px] pr-10">
          <div className="text-right">
            <span className="block text-6xl text-green-600 font-bold">
              Organic food
            </span>
            <span className="block text-6xl text-black font-bold">
              Delivery Service
            </span>
            <h1 className="mt-4 text-xl text-black">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis
              illo totam modi possimus, pariatur recusandae doloremque fuga,
              facilis molestias aut nihil quaerat omnis vel quis facere corrupti
              beatae! Et, impedit.
            </h1>
          </div>

          <div className="pt-10 flex gap-10">
            <button className="bg-green-500 rounded-full px-4 py-2 text-black hover:bg-green-700 w-[150px]">
              Read More
            </button>
            <button className="bg-green-500 rounded-full px-4 py-2 text-black hover:bg-green-700  w-[150px]">
              View Plans
            </button>
          </div>
        </div>

        {/* Info Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 px-20">
          <div className="bg-green-100 p-6 shadow-lg flex items-center">
            <div className="text-center">
              <div className="flex items-center justify-center text-green-500 mb-4">
                {/* Icon for Free Delivery */}
                <BikeIcon className="h-20 w-20" />
              </div>
              <h2 className="font-bold text-xl text-black mb-2">
                Free delivery service
              </h2>
              <p className="text-gray-700">
                Nam malesuada eros nec luctus laoreet. Fusce sodales consequat.
              </p>
            </div>
          </div>

          <div className="bg-green-200 p-6 shadow-lg flex items-center">
            <div className="text-center">
              <div className=" flex justify-center text-green-500 text-4xl mb-4">
                {/* Icon for Easy Payments */}
                <Wallet className="h-20 w-20" />
              </div>
              <h2 className="font-bold text-xl text-black mb-2">
                Easy payments
              </h2>
              <p className="text-gray-700">
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra.
              </p>
            </div>
          </div>

          <div className="bg-green-300 p-6 shadow-lg flex items-center">
            <div className="text-center">
              <div className="flex justify-center text-green-500 text-4xl mb-4">
                {/* Icon for Exact Calories */}
                <Calculator className="w-20 h-20" />
              </div>
              <h2 className="font-bold text-black text-xl mb-2">
                Exact calories
              </h2>
              <p className="text-gray-700">
                Nam malesuada eros nec luctus laoreet. Fusce sodales consequat.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      {/* Info Cards Section */}
      <div className="bg-gray-100 py-20 my-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 px-20">
          <div className="bg-green-100 p-6 rounded-md shadow-lg text-center transition-all duration-300 hover:bg-green-200 hover:shadow-xl hover:scale-105">
            <div className="text-green-500 flex justify-center text-4xl mb-4">
              <AppleIcon className="h-20 w-20" />
            </div>
            <h2 className="font-bold text-xl mb-2">Only natural food</h2>
            <p className="text-gray-700">
              Nam malesuada eros nec luctus laoreet. Fusce sodales consequat.
            </p>
          </div>

          <div className="bg-green-200 p-6 rounded-md shadow-lg text-center transition-all duration-300 hover:bg-green-200 hover:shadow-xl hover:scale-105">
            <div className="text-green-500 flex justify-center text-4xl mb-4">
              <PaletteIcon className="h-20 w-20" />
            </div>
            <h2 className="font-bold text-xl mb-2">Various dishes</h2>
            <p className="text-gray-700">
              Nullam faucibus a libero quis vestibulum proin vestibulum.
            </p>
          </div>

          <div className="bg-green-300 p-6 rounded-md shadow-lg text-center transition-all duration-300 hover:bg-green-200 hover:shadow-xl hover:scale-105">
            <div className="text-green-500 flex justify-center text-4xl mb-4">
              <BaggageClaim className="h-20 w-20" />
            </div>
            <h2 className="font-bold text-xl mb-2">Handy packaging</h2>
            <p className="text-gray-700">
              Vestibulum ante ipsum primis in faucibus orci luctus et ultricies.
            </p>
          </div>

          <div className="bg-green-400 p-6 rounded-md shadow-lg text-center transition-all duration-300 hover:bg-green-200 hover:shadow-xl hover:scale-105">
            <div className="text-green-500 flex justify-center text-4xl mb-4">
              <CookingPot className="h-20 w-20" />
            </div>
            <h2 className="font-bold text-xl mb-2">No frying</h2>
            <p className="text-gray-700">
              Donec vitae turpis orci. In dignissim risus sed iaculis laoreet.
            </p>
          </div>
        </div>
      </div>

      {/* Restaurant Section */}
      <section className="px-20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold italic">Popular Restaurants</h2>
        </div>
        <div className="flex items-center justify-center">
          {restaurants.length === 0 ? (
            <div
              className="w-full h-96 flex flex-col text-start bg-cover bg-center text-white "
              style={{ backgroundImage: `url('/restaurant.png')` }}
            >
              <div className="mt-3">
                <h2 className="text-2xl font-bold text-black">
                  No Restaurants Available
                </h2>
                <p className="mt-2 text-lg text-gray-700">
                  Click "Add Restaurant" to get started!
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 items-center">
              {restaurants.map((restaurant, index) => (
                <Card
                  onClick={() =>
                    navigate(`/shop/menu-items?id=${restaurant.restaurant_id}`)
                  }
                  key={index}
                  className="rounded-2xl cursor-pointer overflow-hidden shadow-lg transition-transform transform hover:scale-[1.03] hover:shadow-2xl bg-white"
                >
                  {/* Image Section with Overlay */}
                  <div className="relative w-full h-48">
                    <img
                      src={restaurant.image}
                      alt={restaurant.restaurantName}
                      className=" relative w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <h1 className="absolute bottom-1 left-2 text-2xl font-bold text-white">
                      {restaurant.restaurantName}
                    </h1>
                  </div>

                  <CardContent className="">
                    <div className="flex justify-between my-2">
                      <div>
                        <p className="flex items-center gap-1">
                          <Clock size={18} className="text-blue-500" />
                          <span>
                            {restaurant.openingHour} - {restaurant.closingHour}
                          </span>
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
                      <p className="text-gray-600 text-sm">
                        {restaurant.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="text-center mb-8">
          <h3 className="text-green-600 text-lg font-medium">Our Menu</h3>
          <h2 className="text-3xl font-bold">Popular Dishes</h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Nullam laoreet arcu eu massa euismod, quis dictum massa sodales.
            Proin eget scelerisque dui. Phasellus id enim lobortis, porta orci
            at, viverra turpis.
          </p>
        </div>

        <div className="px-6 lg:px-12">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={28}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000, // 3 seconds
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {dishes.map((dish) => (
              <SwiperSlide key={dish.id}>
                <div className="flex flex-col items-center">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="rounded-full w-48 h-48 object-cover my-4 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
                  />
                  <h2 className="font-bold text-2xl text-gray-700 text-center cursor-pointer hover:text-green-500">
                    {dish.name}
                  </h2>
                  <p className="text-gray-500 mt-2 text-center">
                    {dish.description}
                  </p>
                  <h1 className="text-center font-bold text-4xl text-red-500 my-4">
                    ${dish.price}
                  </h1>
                  <button
                    type="submit"
                    className="bg-green-500 rounded-lg py-2 px-4"
                  >
                    Add to Cart
                  </button>
                  <button className="text-red-500 font-bold my-4">
                    Read More
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Home;
