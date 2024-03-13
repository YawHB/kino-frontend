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
    const { register, handleSubmit, reset } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = (newUser) => {
        console.log(newUser);

        auth.signUp(newUser)
            .then(() => {
                toast({
                    title: "Signed up successfully!",
                    description: "You can now login with username " + newUser.username,
                });
                //navigate("/home", { replace: true });
                reset();
            })
            .catch((e) => {
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
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <h2>Signup</h2>
                <div className="flex flex-col gap-1">
                    <label htmlFor="username">Username</label>
                    <input {...register("username", { required: true })} />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="username">Password</label>
                    <input type="password" {...register("password", { required: true })} />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="username">Email</label>
                    <input type="email" {...register("email", { required: true })} />
                </div>
                <input className="bg-red-500 mt-3" type="submit" value={"Submit"} />
            </form>
        </>
    );
}
