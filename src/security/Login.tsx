import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
    username: string;
    password: string;
};

export default function Login() {
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
                //TODO: Login with username: blabla was successful
                navigate("/home", { replace: true });
            })
            .catch((err) => {
                //TODO: Toaster
                console.log(err);
            });
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="username">Username</label>
                <input {...register("username", { required: true })} />
                {errors.username?.type === "required" && <p>Username is required</p>}

                <label htmlFor="username">Password</label>
                <input type="password" {...(register("password"), { required: true })} />
                {errors.password?.type === "required" && <p>Password is required</p>}

                <input type="submit" value="Login" />
            </form>
        </>
    );
}
