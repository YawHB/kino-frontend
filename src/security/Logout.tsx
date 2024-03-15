import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "../contexts/AuthProvider";
import { Navigate } from "react-router-dom";


export default function Logout() {
    const { toast } = useToast();
    const auth = useAuth();
    auth.signOut();
    toast({
        title: "Logged out successfully",
        description: "See you soon!",
    });
    return <Navigate to="/movies" replace={true} />;
}
