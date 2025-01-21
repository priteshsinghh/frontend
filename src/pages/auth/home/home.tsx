import { AppleIcon, BaggageClaim, BikeIcon, Calculator, CookingPot, PaletteIcon, Wallet } from "lucide-react";
import React from "react";

const Home: React.FC = () => {
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
                        <span className="block text-6xl text-green-600 font-bold">Organic food</span>
                        <span className="block text-6xl text-black font-bold">Delivery Service</span>
                        <h1 className="mt-4 text-xl text-black">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis illo totam modi possimus,
                            pariatur recusandae doloremque fuga, facilis molestias aut nihil quaerat omnis vel quis facere
                            corrupti beatae! Et, impedit.
                        </h1>
                    </div>

                    <div className="pt-10 flex gap-10">
                        <button className="bg-green-500 rounded-full px-4 py-2 text-black hover:bg-green-700 w-[150px]">Read More</button>
                        <button className="bg-green-500 rounded-full px-4 py-2 text-black hover:bg-green-700  w-[150px]">View Plans</button>
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
                            <h2 className="font-bold text-xl text-black mb-2">Free delivery service</h2>
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
                            <h2 className="font-bold text-xl text-black mb-2">Easy payments</h2>
                            <p className="text-gray-700">
                                Class aptent taciti sociosqu ad litora torquent per conubia nostra.
                            </p>
                        </div>
                    </div>

                    <div className="bg-green-300 p-6 shadow-lg flex items-center">
                        <div className="text-center">
                            <div className="flex justify-center text-green-500 text-4xl mb-4">
                                {/* Icon for Exact Calories */}
                                <Calculator className="w-20 h-20" />
                            </div>
                            <h2 className="font-bold text-black text-xl mb-2">Exact calories</h2>
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
                    <div className="bg-green-100 p-6 rounded-md shadow-lg text-center">
                        <div className="text-green-500 flex justify-center text-4xl mb-4">
                            <AppleIcon className="h-20 w-20"/>
                        </div>
                        <h2 className="font-bold text-xl mb-2">Only natural food</h2>
                        <p className="text-gray-700">
                            Nam malesuada eros nec luctus laoreet. Fusce sodales consequat.
                        </p>
                    </div>

                    <div className="bg-green-200 p-6 rounded-md shadow-lg text-center">
                        <div className="text-green-500 flex justify-center text-4xl mb-4">
                            <PaletteIcon className="h-20 w-20"/>
                        </div>
                        <h2 className="font-bold text-xl mb-2">Various dishes</h2>
                        <p className="text-gray-700">
                            Nullam faucibus a libero quis vestibulum proin vestibulum.
                        </p>
                    </div>

                    <div className="bg-green-300 p-6 rounded-md shadow-lg text-center">
                        <div className="text-green-500 flex justify-center text-4xl mb-4">
                            <BaggageClaim className="h-20 w-20"/>
                        </div>
                        <h2 className="font-bold text-xl mb-2">Handy packaging</h2>
                        <p className="text-gray-700">
                            Vestibulum ante ipsum primis in faucibus orci luctus et ultricies.
                        </p>
                    </div>

                    <div className="bg-green-400 p-6 rounded-md shadow-lg text-center">
                        <div className="text-green-500 flex justify-center text-4xl mb-4">
                            <CookingPot className="h-20 w-20"/>
                        </div>
                        <h2 className="font-bold text-xl mb-2">No frying</h2>
                        <p className="text-gray-700">
                            Donec vitae turpis orci. In dignissim risus sed iaculis laoreet.
                        </p>
                    </div>
                </div>
            </div>



        </>
    );
};

export default Home;
