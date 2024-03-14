import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import Button from "../core/Button";

export default function AuthStatus() {
    const auth = useAuth();

    return (
        <>
            {auth.isLoggedIn() ? (
                <>
                    <p className="font-bold">Logged in as: {auth.username}</p>
                    <NavLink to={"/logout"}>
                        <Button>Logout</Button>
                    </NavLink>
                </>
            ) : (
                <>
                    <NavLink to={"/login"}>
                        <Button>Login</Button>
                    </NavLink>
                </>
            )}
        </>
    );
}
