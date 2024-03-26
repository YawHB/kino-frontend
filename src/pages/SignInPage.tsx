import { useState } from "react";
import Login from "../security/Login";
import Signup from "../security/Signup";

export default function SignInPage() {
    const [form, setForm] = useState<"signup" | "login">("login");

    return (
        <div className="m-auto my-10 max-w-lg">
            {form === "signup" && <Signup changeForm={setForm} />}
            {form === "login" && <Login changeForm={setForm} />}
        </div>
    );
}
