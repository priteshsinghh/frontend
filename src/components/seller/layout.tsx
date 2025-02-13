import { Outlet } from "react-router-dom";
import SellerHeader from "./header";
// import SellerSidebar from "./sidebar";

const SellerLayout: React.FC = () => {
    return (

        <div className="flex flex-1 flex-col">
            <SellerHeader />
            <div className="flex flex-col w-full ">
                <Outlet />
            </div>
        </div>

    );
};

export default SellerLayout;
