import { useAuth } from "../contexts/AuthProvider";
import {useLocation, useNavigate} from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";

type FormValues = {
    username: string;
    password: string;
};

export default function Login() {
    const { toast } = useToast();
    const auth = useAuth();
    const navigate = useNavigate();
    //const from = useLocation().state?.from?.pathname || "/movies";

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = (user) => {
        auth.signIn(user)
            .then((loggedInUser) => {
                toast({
                    title: "Logged in successfully!",
                    description: "Username: " + user.username,
                });

                const {roles} = loggedInUser;

                roles.includes("ADMIN") ? navigate("/admin", { replace: true }) : navigate("/movies", { replace: true });
            })
            .catch(() => {
                toast({
                    title: "Login failed!",
                    description: `Wrong username or password. Try again.`,
                    variant: "destructive",
                });
                reset({ password: "" });
            });
    };

    return (
        <>
            
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="align">Login</h2>
                <div className="flex flex-col gap-1">
                    <label htmlFor="username">Username</label>
                    <input {...register("username", { required: true })} />
                    {errors.username?.type === "required" && <p>Username is required</p>}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="username">Password</label>
                    <input type="password" {...register("password", { required: true })} />
                    {errors.password?.type === "required" && <p>Password is required</p>}
                </div>

                <input className="bg-red-500 mt-3" type="submit" value="Login" />
            </form>
        </>
    );
}
