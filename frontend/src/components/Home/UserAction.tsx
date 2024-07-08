import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth"

const UserAction = () => {
    const { setJwt } = useAuth();
    return (
        <div className="absolute top-14 right-0 h-[100px] w-[200px] bg-white shadow-lg z-[1] rounded-[4px] cursor-pointer flex flex-col">
            <div className="flex-1 text-black flex justify-center items-center hover:bg-slate-200 duration-300 rounded-[4px]"><Link to={'/profile'}>Profile</Link></div>
            <div className="flex-1 text-black flex justify-center items-center hover:bg-slate-200 duration-300 rounded-[4px]" onClick={() =>setJwt("")}>Logout</div>
        </div>
    )
}

export default UserAction