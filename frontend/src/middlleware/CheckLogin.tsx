import { Outlet, Navigate } from "react-router-dom"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";

const CheckLogin = ({ checkVal }: { checkVal: boolean }) => {
    const {jwt} = useAuth();
    const isLoggedin = jwt;

    if (!checkVal) {
        if (isLoggedin) {
            return <Navigate to="/" replace />;
        }

        return (
            <>{<Outlet />}</>
        )
    }

    if (!isLoggedin) {
        return <Navigate to="/auth" replace />;
    }

    return (
        <div className="flex flex-col">
            <Navbar />
            {
                <Outlet />
            }
            <Footer/>
        </div>
    )
}

export default CheckLogin