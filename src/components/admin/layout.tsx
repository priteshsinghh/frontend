
import { Outlet } from "react-router-dom";

const AdminLayout: React.FC = () => {


    return (

        <div className="flex min-h-screen w-full">
         
            <div className="flex flex-1 flex-col">
                
                <div className="flex-1 flex-col bg-muted/40 p-4 md:p-6">
                    <Outlet />
                </div>
            </div>

        </div>
    )
}


export default AdminLayout;