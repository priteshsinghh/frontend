import { Outlet } from "react-router-dom";
import Header from "./header";

function ShoppingLayout()  {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* common header */}
      <Header/>
      <main className="flex flex-col w-full">
        <Outlet/>
      </main>
      {/* <ShoppingFooter/> */}
    </div>
  );
};

export default ShoppingLayout;