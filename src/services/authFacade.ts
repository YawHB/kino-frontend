import { API_URL } from "../settings";
import { makeOptions, handleHttpErrors } from "./fetchUtils";
const LOGIN_URL = API_URL + "/api/auth/login";
const SIGNUP_URL = API_URL + "/api/user";

export type User = { username: string; password: string; roles?: string[] };

interface LoginResponse {
    username: string;
    token: string;
    roles: Array<string>;
}

interface LoginRequest {
    username: string;
    password: string;
}

interface SignupRequest {
    username: string;
    password: string;
    email: string;
}

const authProvider = {
    isAuthenticated: false,
    signIn(user_: LoginRequest): Promise<LoginResponse> {
        const options = makeOptions("POST", user_);
        return fetch(LOGIN_URL, options).then(handleHttpErrors);
    },
    signUp(user_: SignupRequest) {
        const options = makeOptions("POST", user_);
        return fetch(SIGNUP_URL, options).then(handleHttpErrors);
    }
};



export type { LoginResponse, LoginRequest, SignupRequest };
export { authProvider };
