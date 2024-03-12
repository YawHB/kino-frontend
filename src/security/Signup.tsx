import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

type FormValues = {
    username: string;
    password: string;
    email: string;
};

export default function Signup() {
    const { toast } = useToast();
    const auth = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = (newUser) => {
        console.log(newUser);

        auth.signUp(newUser)
            .then(() => {
                //TODO: Signup with username: blabla was successfull
                toast({
                    title: "Signed up successfully!",
                    description: "You can now login with username " + newUser.username,
                });
                navigate("/home", { replace: true });
            })
            .catch((e) => {
                //TODO: Toaster
                console.log(e);
                toast({
                    title: "Sign up failed!",
                    description: "username or email is already in use. Try again.",
                    variant: "destructive",
                });
            });
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="username">Username</label>
                <input {...register("username")} />
                <label htmlFor="username">Password</label>
                <input type="password" {...register("password")} />
                <label htmlFor="username">Email</label>
                <input type="email" {...register("email")} />
                <input type="submit" value={"Submit"} />
            </form>
        </>
    );
}
