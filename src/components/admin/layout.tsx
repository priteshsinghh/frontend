
import { Outlet } from "react-router-dom";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import React, { useState } from "react";

const AdminLayout: React.FC = () => {
    const [openSidebar, setOpenSidebar] = useState(false);

    return (

        <div className="flex min-h-screen w-full">
            {/*  admin sidebar */}
            <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} />
            <div className="flex flex-1 flex-col">
                {/* admin header */}
                <AdminHeader setOpen={setOpenSidebar} />
                <div className="flex-1 flex-col bg-muted/40 p-4 md:p-6">
                    <Outlet />
                </div>
            </div>

        </div>
    )
}


export default AdminLayout;