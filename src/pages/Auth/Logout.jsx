import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useEffect } from "react";

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        // clear the token cookie
        axios.get('http://localhost:3000/logout', { withCredentials: true })
        .then(res => {
                Cookies.remove('token');
                console.log(res.data.message);
            });

        toast.success("Logged out successfully");


        navigate('/login');

    }, [navigate]);

    return null; //  return nothing 
}
