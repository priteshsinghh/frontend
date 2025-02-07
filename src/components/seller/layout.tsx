import { Outlet } from "react-router-dom";
import SellerHeader from "./header";
import SellerSidebar from "./sidebar";

const SellerLayout: React.FC = () => {
    return (
        <div className="flex min-h-screen w-full">
            <SellerSidebar />
            <div className="flex flex-1 flex-col">
                <SellerHeader />
                <div className="">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default SellerLayout;
