import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

type FormValues = {
    username: string;
    password: string;
    email: string;
};

export default function Signup() {
    const auth = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = (newUser) => {
        console.log(newUser);

        auth.signUp(newUser)
            .then(() => {
                //TODO: Signup with username: blabla was successfull
                navigate("/home", { replace: true });
            })
            .catch((e) => {
                //TODO: Toaster
                console.log(e);
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
