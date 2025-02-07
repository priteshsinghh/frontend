import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/use-toast";

const SellerHeader: React.FC = () => {

    const navigate = useNavigate();
    const {toast} = useToast();

    function handleLogout() {
        localStorage.clear();
        navigate("/auth/login");
        toast({
            title: "Logout Successfully!"
        })
    }

    return (
        <header className="bg-background w-full p-4 flex justify-end items-center text-white border-b">
            {/* Logout Button */}
            <button 
                onClick={handleLogout} 
                className="flex items-center gap-2 bg-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
                <LogOut size={20} /> Logout
            </button>
        </header>
    );
};

export default SellerHeader;
