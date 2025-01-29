// import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import { Outlet } from "react-router-dom";

function ShoppingLayout()  {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* common header */}
      
      <div className="flex flex-col w-full">
      <Header/>
        <Outlet/>
      </div>
      <Footer/>
    </div>
  );
};

export default ShoppingLayout;