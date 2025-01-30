import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";




const ShoppingLayout: React.FC = () => {

    return (

        <div className="">
            <Header />
            <div>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}


export default ShoppingLayout;