import * as z from "zod";

const loginSchema = z.object({
    email: z.string().email().max(50,  {message: 'Email must be less than 50 characters!'}),
    password: z.string().min(6, { message: 'Password must be greater than 6 characters!'}).max(20, {message: 'Password must be less than 20 characters!'})
})

export default loginSchema