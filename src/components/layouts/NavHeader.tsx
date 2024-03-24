import { NavLink } from "react-router-dom";
import AuthStatus from "./AuthStatus";
import KinoSelect from "./KinoSelect";
import { useAuth } from "@/contexts/AuthProvider";
import Button from "../core/Button";
import { RxAvatar } from "react-icons/rx";
import { MdLocalMovies, MdAdminPanelSettings } from "react-icons/md";

export default function NavHeader() {
    const auth = useAuth();

    return (
        <nav>
            <div className="mx-auto flex items-center justify-between bg-gradient-to-t from-red-700 to-red-600 p-5 drop-shadow-lg">
                <div className="flex gap-3">
                    {!auth.isLoggedInAs(["ADMIN"]) && (
                        <NavLink to={"/movies"}>
                            <Button style="primary" icon={<MdLocalMovies size={20} />}>
                                Movies
                            </Button>
                        </NavLink>
                    )}
                    {auth.isLoggedInAs(["ADMIN"]) && (
                        <NavLink to={"/admin"}>
                            <Button style="primary" icon={<MdAdminPanelSettings size={20} />}>
                                Admin
                            </Button>
                        </NavLink>
                    )}
                    {auth.isLoggedInAs(["USER"]) && (
                        <NavLink to={"/profile"}>
                            <Button style="primary" icon={<RxAvatar size={20} />}>
                                My Profile
                            </Button>
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
