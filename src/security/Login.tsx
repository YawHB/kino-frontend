import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { User } from "../services/authFacade";
import { useNavigate } from "react-router-dom";

const EMPTY_USER = { username: "", password: "" };

export default function Login() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [user, setUser] = useState({...EMPTY_USER });
    const [error, setError] = useState(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        auth.signIn(user as User)
            .then(() => {
                navigate("/home", { replace: true });
            })
            .catch((err) => {
                //TODO: Toaster
                setError(err.message);
            });
        
        setUser({ ...EMPTY_USER });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={user.username}
                    onChange={(e) => setUser((prev) => ({ ...prev, username: e.target.value }))}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="text"
                    name="password"
                    id="password"
                    value={user.password}
                    onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))}
                />
                <input type="submit" value="Login" />
            </form>
        </>
    );
}
