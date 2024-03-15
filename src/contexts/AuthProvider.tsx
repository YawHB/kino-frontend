import { createContext, useState, ReactNode } from "react";
import { authProvider, User, LoginRequest, LoginResponse, SignupRequest } from "../services/authFacade";
import { useContext } from "react";

interface AuthContextType {
    username: string | null;
    email: string | null;
    signIn: (user: User) => Promise<LoginResponse>;
    signOut: () => void;
    isLoggedIn: () => boolean;
    isLoggedInAs: (role: string[]) => boolean;
    signUp: (user: SignupRequest) => Promise<LoginResponse>;
}

const AuthContext = createContext<AuthContextType>(null!);

export default function AuthProvider({ children }: { children: ReactNode }) {
    //We use this to distinguish between being logged in or not
    const initialUsername = localStorage.getItem("username") || null;
    const [username, setUsername] = useState<string | null>(initialUsername);

    const initialEmail = localStorage.getItem("email") || null;
    const [email, setEmail] = useState<string | null>(initialEmail);

    

    const signIn = async (user_: LoginRequest) => {
        return authProvider.signIn(user_).then((user) => {
            console.log(user);
            
            setUsername(user.username);
            setEmail(user.email);
            localStorage.setItem("username", user.username);
            localStorage.setItem("roles", JSON.stringify(user.roles));
            localStorage.setItem("token", user.token);
            localStorage.setItem("email", user.email);
            return user;
        });
    };

    const signUp = async (user_: SignupRequest) => {
        return authProvider.signUp(user_).then((user) => {
            return user;
        })
    }

    const signOut = () => {
        setUsername(null);
        setEmail(null);
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("roles");
        localStorage.removeItem("email");
        
    };

    function isLoggedIn() {
        const token = localStorage.getItem("token") || null;

        if (!token) return false;

        const encodedClaims = token.split(".")[1];
        const claims: { exp: number } = JSON.parse(atob(encodedClaims));

        //Vi ganger med 1000, da claims.exp er i sekunder og Date.now() i milisekunder
        const tokenExp = new Date(claims.exp * 1000);

        if (new Date() > tokenExp) return false;

        return username != null;
    }

    function isLoggedInAs(role: string[]) {
        const roles: Array<string> = JSON.parse(localStorage.getItem("roles") || "[]");
        return roles?.some((r) => role.includes(r)) || false;
    }

    const value = { username, isLoggedIn, isLoggedInAs, signIn, signOut, signUp, email };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

//Hjælpe funktion
export function useAuth() {
    return useContext(AuthContext);
}
