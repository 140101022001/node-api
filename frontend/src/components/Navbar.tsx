import { useCallback, useEffect, useState } from "react";
import UserAction from "./Home/UserAction";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import useUser from "../hooks/useUser";
import { Link } from "react-router-dom";

const Navbar = () => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const [toggle, setToggle] = useState<boolean>(false);
    const { jwt } = useAuth();
    const { user, setUser } = useUser();
    
    const getProfile = useCallback(async () => {
        try {
            const res = await axios.get(backendURL + '/profile', {headers: {
                Authorization: 'Bearer ' + jwt  
            }})
            setUser(res.data.user)
        } catch (error) {
            console.log(error);
        }
    }, [jwt, backendURL, setUser])

    useEffect(() => {
        getProfile()
    },[getProfile])

    return (
        <header className="flex justify-between px-10 h-[100px] items-center bg-green-500 shadow-xl text-white">
            <div className="flex-1">
                <Link to={'/'}><h1>Logo</h1></Link>
            </div>
            <nav className="flex-1">
                <ul className="flex justify-between w-[20%] ml-auto">
                    <li className="relative">
                        <img src={`${backendURL}${user.avatar ? user.avatar : "/imgs/hero.png"}`} alt="" width={50} height={50} className="rounded-full cursor-pointer" onClick={() => setToggle(!toggle)}/>
                        {toggle && <UserAction/>}
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar