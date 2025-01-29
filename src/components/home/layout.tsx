// import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import Home from "../../pages/home/home";

function ShoppingLayout()  {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* common header */}
      <Header/>
      <div className="flex flex-col w-full">
        <Home/>
      </div>
      <Footer/>
    </div>
  );
};

export default ShoppingLayout;