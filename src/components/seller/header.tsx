import { House, LayoutDashboard, LogOut, Menu, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/use-toast";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useState } from "react";

const SellerHeader: React.FC = () => {

    const navigate = useNavigate();
    const { toast } = useToast();
    const [open, setOpen] = useState(false)

    function handleLogout() {
        localStorage.clear();
        navigate("/auth/login");
        toast({
            title: "Logout Successfully!"
        })
    }

    return (

        <header className="stickey top-0 z-40 w-full bg-background border-b">
            <div className="flex h-16 items-center justify-between px-4 md:px-6" >
                <Link to="/seller/dashboard" className="flex items-center gap-2" >
                    <House className="h-6 w-6" />
                    <span className="font-bold text-indigo-500" >Seller Panel</span>
                </Link>

                <div className="lg:flex items-center gap-8 hidden sm:block md:hidden">
                    <Link to="/seller/dashboard" className="flex items-center gap-2" >
                        {/* <House className="h-6 w-6" /> */}
                        <span className="font-bold text-indigo-500" >Dashboard</span>
                    </Link>
                    <Link to="/seller/setting" className="flex items-center gap-2" >
                        {/* <House className="h-6 w-6" /> */}
                        <span className="font-bold text-indigo-500" >Setting</span>
                    </Link>
                </div>

                <Button
                    onClick={handleLogout}
                    className="bg-indigo-500 hover:bg-indigo-700 transition duration-300 hidden sm:block md:hidden lg:flex"
                >
                    <LogOut size={20} /> Logout
                </Button>
                <Sheet open={open} onOpenChange={setOpen} >
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="lg:hidden">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle Header Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full max-w-xs" >

                        <div className="flex flex-col gap-6">
                            <div className="py-4">
                                <Link to="/seller/dashboard" className="flex items-center gap-2">
                                    <House className="h-7 w-7 font-bold" />
                                    <span className="font-bold text-2xl" >Seller Panel</span>
                                </Link>
                            </div>

                            <Link to="/seller/dashboard" className="flex items-center gap-2" >
                                <LayoutDashboard className="h-6 w-6" />
                                <span className="font-bold text-indigo-500" >Dashboard</span>
                            </Link>

                            <Link to="/seller/setting" className="flex items-center gap-2" >
                                <Settings className="h-6 w-6" />
                                <span className="font-bold text-indigo-500" >Setting</span>
                            </Link>
                            <Button
                                onClick={handleLogout}
                                className="bg-indigo-500 hover:bg-indigo-700 transition duration-300 w-2/4"
                            >
                                <LogOut size={20} /> Logout
                            </Button>
                        </div>

                    </SheetContent>
                </Sheet>

            </div>
        </header >
    );
};

export default SellerHeader;
