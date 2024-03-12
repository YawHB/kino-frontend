import Login from "../security/Login";
import Signup from "../security/Signup";

export default function SignInPage() {
    return (
        <div className="grid grid-cols-2 w-1/2 m-auto my-10">
            <Signup />
            <Login />
        </div>
    );
}
