import { useState } from "react";
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
                //TODO: Signup with username: blabla was succesfull
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
                <input {...register("username")} placeholder="First name" />
                <input {...register("password")} placeholder="Password" />
                <input {...register("email")} placeholder="email" />
                <input type="submit" value={"Submit"} />
            </form>
        </>
    );
}
