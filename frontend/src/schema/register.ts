import * as z from "zod";

const registerSchema = z.object({
    name: z.string().min(3, {message:"Name must be greater than 6 characters!"}).max(40, {message: "Name must be less than 40 characters!"}),
    email: z.string().email().max(50,  {message: 'Email must be less than 50 characters!'}),
    password: z.string().min(6, { message: 'Password must be greater than 6 characters!'}).max(20, {message: 'Password must be less than 20 characters!'}),
    pasword_confirmation: z.string().min(6, { message: 'Password must be greater than 6 characters!'}).max(20, {message: 'Password must be less than 20 characters!'})
}).refine((val) => {
    const {password, pasword_confirmation } = val;
    return password == pasword_confirmation;
}, { message: "Password doesn't match!", path: ['pasword_confirmation']})

export default registerSchema;