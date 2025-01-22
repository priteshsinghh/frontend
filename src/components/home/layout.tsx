import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

function ShoppingLayout()  {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* common header */}
      <Header/>
      <div className="flex flex-col w-full">
        <Outlet/>
      </div>
      <Footer/>
    </div>
  );
};

export default ShoppingLayout;