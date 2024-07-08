import { useState } from "react"
import LoginForm from "../../components/Auth/LoginForm"
import RegisterForm from "../../components/Auth/RegisterForm";


const Auth = () => {
    const [registerPage, setRegisterPage] = useState<boolean>(false);
    const [mess, setMess] = useState<string>(""); 
    return (
        <div className="h-screen w-screen grid grid-cols-2">
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-[50%] px-10 py-5 shadow-2xl rounded-md">
                    {registerPage ? <RegisterForm setRegisterPage={setRegisterPage} setMess={setMess}/> : <LoginForm setRegisterPage={setRegisterPage} setMess={setMess} mess={mess}/>}
                </div>
            </div>
            <div className="bg-green-700">
                logo
            </div>
        </div>
    )
}

export default Auth