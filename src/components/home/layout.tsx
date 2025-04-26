import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import CartModal from "./cartModal";

const ShoppingLayout: React.FC = () => {
  return (
    <div className="no-scrollbar">
      <div className="fixed top-0 left-0 right-0 z-10">
        <Header />
      </div>
      <div className="pt-16">
        <Outlet />
        <CartModal />
      </div>
      <Footer />
    </div>
  );
};

export default ShoppingLayout;
