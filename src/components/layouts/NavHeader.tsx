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
            <div className="mx-auto flex flex-wrap items-center justify-between bg-gradient-to-t from-red-700 to-red-600 p-3 drop-shadow-lg">
                <section className="flex items-center gap-3">
                    <div className="flex flex-col items-center">
                        <img className="max-w-20 drop-shadow-sm" src="cat_popcorn.png" alt="cat_popcorn" />
                        <p className="font-bold text-red-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">CYBA Cinemas</p>
                    </div>
                    <KinoSelect />
                    {!auth.isLoggedInAs(["ADMIN"]) && (
                        <NavLink to={"/movies"}>
                            <Button style="primary" icon={<MdLocalMovies size={20} />}>
                                Movies
                            </Button>
                        </NavLink>
                    )}
                </section>

                <section className="flex items-center gap-3">
                    {auth.isLoggedInAs(["ADMIN"]) && (
                        <NavLink to={"/admin"}>
                            <Button style="primary" icon={<MdAdminPanelSettings size={20} />}>
                                Admin Dashboard
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
                    <AuthStatus />
                </section>
            </div>
        </nav>
    );
}
