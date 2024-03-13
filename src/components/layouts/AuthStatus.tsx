import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import Button from "../core/Button";

export default function AuthStatus() {
    const auth = useAuth();

    return (
        <>
            {auth.isLoggedIn() ? (
                <>
                    <p>Logged in as: {auth.username}</p>
                    <NavLink to={"/logout"}>Logout</NavLink>
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
