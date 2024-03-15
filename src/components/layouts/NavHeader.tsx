import { NavLink } from "react-router-dom";
import AuthStatus from "./AuthStatus";
import KinoSelect from "./KinoSelect";
import { useAuth } from "@/contexts/AuthProvider";
import Button from "../core/Button";

export default function NavHeader() {
    const auth = useAuth();

    return (
        <nav>
            <div className="flex justify-around items-center pt-5 pb-5 mx-auto bg-red-700 ">
                <div className="flex gap-3">
                    <NavLink to={"/movies"}>
                        <Button>Movies</Button>
                    </NavLink>
                    {auth.isLoggedInAs(["ADMIN"]) && (
                        <NavLink to={"/admin"}>
                            <Button>Admin</Button>
                        </NavLink>
                    )}
                    {auth.isLoggedInAs(["USER"]) && (
                        <NavLink to={"/profile"}>
                            <Button>My Profile</Button>
                        </NavLink>
                    )}
                </div>
                <h1 className="text-5xl font-bold font-sans ">Kino</h1>

                <div className="flex gap-5 items-center">
                    <KinoSelect />
                    <AuthStatus />
                </div>
            </div>
        </nav>
    );
}
