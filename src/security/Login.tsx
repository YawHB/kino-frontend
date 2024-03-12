import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
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
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = (user) => {
        console.log(user);

        auth.signIn(user)
            .then(() => {
                toast({
                    title: "Logged in successfully!",
                    description: "Username: " + user.username,
                });
                navigate("/home", { replace: true });
            })
            .catch((err) => {
                toast({
                    title: "Login failed!",
                    description: `Wrong username or password. Try again.`,
                    variant: "destructive",
                });
            });
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="username">Username</label>
                <input {...register("username", { required: true })} />
                {errors.username?.type === "required" && <p>Username is required</p>}

                <label htmlFor="username">Password</label>
                <input type="password" {...register("password", { required: true })} />
                {errors.password?.type === "required" && <p>Password is required</p>}

                <input type="submit" value="Login" />
            </form>
        </>
    );
}
