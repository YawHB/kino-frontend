import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

type Props = {
    changeForm: React.Dispatch<React.SetStateAction<"signup" | "login">>;
};

type FormValues = {
    username: string;
    password: string;
    email: string;
};

export default function Signup({changeForm}: Props) {
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
        <section className="animate-fade-in">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="mb-5 text-2xl font-bold">Sign-up</h2>
                <div className="flex flex-col gap-1">
                    <label htmlFor="username">Username</label>
                    <input className="rounded-sm focus:outline-none focus:outline-red-600" {...register("username", { required: true })} />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="username">Password</label>
                    <input
                        className=" rounded-sm focus:outline-none focus:outline-red-600"
                        type="password"
                        {...register("password", { required: true })}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="username">Email</label>
                    <input className=" rounded-sm focus:outline-none focus:outline-red-600" type="email" {...register("email", { required: true })} />
                </div>
                <input
                    className="mt-5 w-24 cursor-pointer rounded-md bg-red-600 p-2 font-bold text-white transition-all hover:bg-red-400 active:scale-95"
                    type="submit"
                    value={"Submit"}
                />
            </form>
            <div className="text-center">
                Already have an account? <span className="font-bold cursor-pointer hover:text-red-400 transition-all" onClick={()=> changeForm("login")}>Log-in here!</span>
            </div>
        </section>
    );
}
