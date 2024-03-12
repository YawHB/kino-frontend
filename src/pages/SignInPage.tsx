import Login from "../security/Login";
import Signup from "../security/Signup";

export default function SignInPage() {
    return (
        <div className="grid grid-cols-2">
            <Signup />
            <Login />
        </div>
    );
}
