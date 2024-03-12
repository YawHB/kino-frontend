import { NavLink } from "react-router-dom";
import AuthStatus from "./AuthStatus";
import KinoSelect from "./KinoSelect";

export default function NavHeader() {


    return (
        <nav>
            <div className="flex justify-around items-center pt-5 pb-5 mx-auto bg-red-500 ">
                <div className="flex gap-3">
                    <KinoSelect />
                    <NavLink to={"/home"}>Hjem</NavLink>
                </div>
                <h1 className="text-5xl font-sans ">Kino</h1>

                <div className="flex gap-3">
                    <AuthStatus />
                </div>
            </div>
        </nav>
    );
}
