import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";

type Props = {
    changeForm: React.Dispatch<React.SetStateAction<"signup" | "login">>;
};

type FormValues = {
    username: string;
    password: string;
};

export default function Login({ changeForm }: Props) {
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

                const { roles } = loggedInUser;

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
        <section className="animate-fade-in">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="mb-5 text-2xl font-bold">Log-in</h2>
                <div className="flex flex-col gap-1">
                    <label htmlFor="username">Username</label>
                    <input className="rounded-sm focus:outline-none focus:outline-red-600" {...register("username", { required: true })} />
                    {errors.username?.type === "required" && <p>Username is required</p>}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="username">Password</label>
                    <input
                        className="rounded-sm focus:outline-none focus:outline-red-600"
                        type="password"
                        {...register("password", { required: true })}
                    />
                    {errors.password?.type === "required" && <p>Password is required</p>}
                </div>

                <input
                    className="mt-5 w-24 cursor-pointer rounded-md bg-red-600 p-2 font-bold text-white transition-all hover:bg-red-400 active:scale-95"
                    type="submit"
                    value="Login"
                />
            </form>
            <div className="text-center">
                Don't have an account?{" "}
                <span className="cursor-pointer font-bold transition-all hover:text-red-400" onClick={() => changeForm("signup")}>
                    Sign-up here!
                </span>
            </div>
        </section>
    );
}
