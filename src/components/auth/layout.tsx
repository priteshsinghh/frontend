import { Outlet } from "react-router-dom";


function AuthLayout(){
    return (
        <>
        <h1 className=""></h1>
        <div>
            <Outlet/>
        </div>
        </>
    )
}


export default AuthLayout;