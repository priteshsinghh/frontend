import { Outlet } from "react-router-dom";


function AuthLayout() {
    return (
        <div
            className="min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: "url('/bg.png')",
            }}
        >
            <div className="bg-black bg-opacity-10 min-h-screen flex items-center justify-center">
                <div className="text-black max-w-lg">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}


export default AuthLayout;