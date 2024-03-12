import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";

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
                    <NavLink to={"/login"}>Login</NavLink>
                    <NavLink to={"/signup"}>Signup</NavLink>
                </>
            )}
        </>
    );
}
