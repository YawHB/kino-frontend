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
        <nav className="flex flex-col items-center gap-4 bg-gradient-to-t from-red-700 to-red-600 p-3 drop-shadow-lg sm:flex-row sm:justify-between">
            <section className="flex cursor-pointer items-center gap-3">
                <NavLink to={"/movies"}>
                    <div className="group flex flex-col items-center">
                        <img
                            className="max-w-16 drop-shadow-sm transition-all group-hover:scale-105 sm:max-w-20"
                            src="cat_popcorn.png"
                            alt="cat_popcorn"
                        />
                        <h3 className="text-center text-sm font-bold text-red-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] transition-all group-hover:text-red-100 sm:text-lg">
                            CYBA Cinemas
                        </h3>
                    </div>
                </NavLink>
                <KinoSelect />
                {!auth.isLoggedInAs(["ADMIN"]) && (
                    <NavLink to={"/movies"}>
                        <Button style="primary" icon={<MdLocalMovies size={20} />}>
                            Movies
                        </Button>
                    </NavLink>
                )}
            </section>

            <section className="flex w-full items-center justify-between gap-3 sm:w-auto">
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
        </nav>
    );
}
