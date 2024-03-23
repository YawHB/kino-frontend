import { NavLink } from "react-router-dom";
import AuthStatus from "./AuthStatus";
import KinoSelect from "./KinoSelect";
import { useAuth } from "@/contexts/AuthProvider";
import Button from "../core/Button";

export default function NavHeader() {
    const auth = useAuth();

    return (
        <nav>
            <div className="mx-auto flex items-center justify-between bg-red-700 p-5 ">
                <div className="flex gap-3">
                    {!auth.isLoggedInAs(["ADMIN"]) && (
                        <NavLink to={"/movies"}>
                            <Button>Movies</Button>
                        </NavLink>
                    )}
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
                <div className="flex items-center gap-2">
                    <img className="max-w-20" src="cat_popcorn.png" alt="cat_popcorn" />
                    <p className="font-semibold">CYBA Kino</p>
                </div>

                <div className="flex items-center gap-5">
                    <KinoSelect />
                    <AuthStatus />
                </div>
            </div>
        </nav>
    );
}
