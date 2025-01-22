import { AlignJustify, LogOut } from "lucide-react";

const AdminHeader: React.FC = ({setOpen}) =>{
    return(
        <header className="felx itmes-center justify-between px-4 py-3">
            <button onClick={()=> setOpen(true)} className="lg:hidden sm:block">
            <AlignJustify/>
            <span className="sr-only">Toogle menu</span>
            </button>
            <div className="flex justify-end">
                <button className="flex bg-green-500 py-2 px-4 hover:bg-red-500 rounded-lg gap-2">
                    <LogOut/> LogOut
                </button>
            </div>
            
        </header>
    )
}

export default AdminHeader;