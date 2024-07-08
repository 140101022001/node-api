import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import axios from "axios";
import { backendURL } from "../../common";
import { useState } from "react";
import registerSchema from "../../schema/register";

const RegisterForm = ({ setRegisterPage, setMess }: { setRegisterPage: (val: boolean) => void, setMess: (val: string) => void }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            pasword_confirmation: ""
        }
    });

    const [ermess, setErmess] = useState<string>("");

    const onSubmit = async (values: z.infer<typeof registerSchema>) => {
        console.log(values);
        
        try {
            const res = await axios.post(backendURL + '/register', values);
            setRegisterPage(false);
            setMess(res.data.message)
        } catch (error) {
            console.log(error);
            
            if (axios.isAxiosError(error)) {
                setErmess(error?.response?.data?.message);
            } else {
                setErmess("Some thing went wrong!");
            }
        }
    }
    return (
        <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h1 className="text-3xl text-center font-extrabold">Register</h1>
            </div>
            {ermess && <span className="text-red-500">{ermess}</span>}
            <div className="flex flex-col gap-5">
                <div>
                    <label htmlFor="name" className="font-bold text-xl">Name</label>
                    <input type="text" id="name" {...register('name')} />
                    {errors.name?.message && <span className="text-red-500">{errors.name?.message}</span>}
                </div>
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
                <div>
                    <label htmlFor="pasword_confirmation" className="font-bold text-xl">Password Confirmation</label>
                    <input type="password" id="pasword_confirmation" {...register('pasword_confirmation')} />
                    {errors.pasword_confirmation?.message && <span className="text-red-500">{errors.pasword_confirmation?.message}</span>}
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <span className="ml-auto">You already have an account?<span className="text-blue-500 hover:underline cursor-pointer" onClick={() => setRegisterPage(false)}>Login</span></span>
                <button className="w-full bg-green-500 text-white rounded-md cursor-pointer py-3">Register</button>
            </div>
        </form>
    )
}

export default RegisterForm