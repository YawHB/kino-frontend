import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import Button from "../core/Button";
import { MdLogin, MdLogout } from "react-icons/md";

export default function AuthStatus() {
    const auth = useAuth();

    return (
        <>
            {auth.isLoggedIn() ? (
                <>
                    <p className="font-bold">Logged in as: {auth.username}</p>
                    <NavLink to={"/logout"}>
                        <Button style="primary" icon={<MdLogout size={20} />}>
                            Sign out
                        </Button>
                    </NavLink>
                </>
            ) : (
                <>
                    <NavLink to={"/login"}>
                        <Button style="primary" icon={<MdLogin size={20} />}>
                            Log in
                        </Button>
                    </NavLink>
                </>
            )}
        </>
    );
}
