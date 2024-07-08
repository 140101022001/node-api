import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import loginSchema from "../../schema/login";
import * as z from 'zod';
import axios from "axios";
import { backendURL } from "../../common";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const LoginForm = ({setRegisterPage,setMess, mess}: {setRegisterPage: (val: boolean) =>void,setMess: (val: string)=>void, mess: string}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const { setJwt } = useAuth();
    const [ermess, setErmess] = useState<string>("");

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        try {
            const res = await axios.post(backendURL + '/login', values);
            setJwt(res.data.accessToken);
        } catch (error) {
            if (axios.isAxiosError(error))  {
                setMess("")
                setErmess(error?.response?.data?.message);
              } else {
                setMess("")
                setErmess("Some thing went wrong!");
              }
        }
    }
    return (
        <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h1 className="text-3xl text-center font-extrabold">Login</h1>
            </div>
            {ermess && <span className="text-red-500">{ermess}</span>}
            {mess && <span className="text-green-500">{mess}</span>}
            <div className="flex flex-col gap-5">
                <div>
                    <label htmlFor="email" className="font-bold text-xl">Email</label>
                    <input type="text" id="email" {...register('email')} />
                    {errors.email?.message && <span className="text-red-500">{errors.email?.message}</span>}
                </div>
                <div>
                    <label htmlFor="password" className="font-bold text-xl">Password</label>
                    <input type="password" id="password" {...register('password')} />
                    {errors.password?.message && <span className="text-red-500">{errors.password?.message}</span>}
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <span className="ml-auto">You don&apos;t have an account?<span className="text-blue-500 hover:underline cursor-pointer" onClick={() =>setRegisterPage(true)}>Register</span></span>
                <button className="w-full bg-green-500 text-white rounded-md cursor-pointer py-3">Login</button>
            </div>
        </form>
    )
}

export default LoginForm