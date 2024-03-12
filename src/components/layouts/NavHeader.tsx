import { NavLink } from "react-router-dom";
import AuthStatus from "./AuthStatus";
import KinoSelect from "./KinoSelect";
import { useAuth } from "@/contexts/AuthProvider";

export default function NavHeader() {
    const auth = useAuth();

    return (
        <nav>
            <div className="flex justify-around items-center pt-5 pb-5 mx-auto bg-red-500 ">
                <div className="flex gap-3">
                    <NavLink to={"/home"}>Hjem</NavLink>
                    {auth.isLoggedInAs(["ADMIN"]) && <NavLink to={"/admin"}>Admin</NavLink>}
                </div>
                <h1 className="text-5xl font-sans ">Kino</h1>

                <div className="flex gap-5">
                    <KinoSelect />
                    <AuthStatus />
                </div>
            </div>
        </nav>
    );
}
