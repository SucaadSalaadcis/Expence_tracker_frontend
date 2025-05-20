import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(name, email, password);
        try {
            const request = await axios.post("http://localhost:3000/register", { name, email, password });
            const response = request.data;
            if (request.status == 200) {
                toast.success(response.message);
                navigate('/login')
            }
            // console.log(response);
        } catch (error) {
            toast.error(error.response.data.message)
        }

    }

    return (
        <div className="flex flex-col justify-center min-h-screen py-6 bg-gray-100 sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    className="absolute inset-0 transform -skew-y-6 shadow-lg bg-gradient-to-r from-blue-200 to-[#155DFC] sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold text-cyan-900">Sign up </h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <form onSubmit={handleSubmit} className="py-8 space-y-4 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="relative">
                                    <input id="name" name="name" type="text" autoComplete='off'
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full h-10 text-gray-900 border-b-2 border-gray-300 peer focus:outline-none focus:borer-rose-600" placeholder="Name " />

                                </div>
                                <div className="relative">
                                    <input id="email" name="email" type="email" autoComplete='off'
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full h-10 text-gray-900 border-b-2 border-gray-300 peer focus:outline-none focus:borer-rose-600" placeholder="Email " />

                                </div>
                                <div className="relative">
                                    <input id="password" name="password" type="password" autoComplete='off'
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full h-10 text-gray-900 border-b-2 border-gray-300 peer focus:outline-none focus:borer-rose-600" placeholder="Password" />
                                </div>
                                <p className="mt-3">If you have an account.Please <Link to={'/login'} className='text-blue-700 underline'>Login</Link>Here</p>
                                <div className="relative">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 text-white rounded-md bg-[#155DFC] active:scale-95 transition-transform duration-100">
                                        Sign up
                                    </button>
                                </div>
                            </form>
                        </div>
                        <hr className='text-gray-300' />
                    </div>
                </div>
            </div>
        </div>
    )
}
