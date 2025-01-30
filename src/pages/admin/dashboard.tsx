// import AdminHeader from "../../components/admin/header";
// import AdminSidebar from "../../components/admin/sidebar";

function AdminDashboard(){
    return(
        <div className="flex min-h-screen w-full">
            {/*  admin sidebar */}
            {/* <AdminSidebar /> */}
            <div className="flex flex-1 flex-col">
                {/* admin header */}
                {/* <AdminHeader/> */}
                <main className="flex-1 flex-col bg-muted/40 p-4 md:p-6">
                    <h1>Admin Dashboard</h1>
                </main>
            </div>

        </div>
    )
}


export default AdminDashboard;