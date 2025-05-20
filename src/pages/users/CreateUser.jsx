import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

export default function CreateUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const navigate = useNavigate();

    const handleSavUser = (e) => {
        e.preventDefault(); // Prevent form from reloading the page
        const data = {
            name,
            email,
            password,
        };

        axios.post('http://localhost:3000/register', data).then(() => {
            toast.success("Expense Created Successfully...");
            navigate('/users');

            // Reset form fields
            setName('');
            setPassword('');
            setEmail('');
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <form onSubmit={handleSavUser} className="max-w-3xl p-8 mx-auto mt-10 space-y-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-800">Add New User</h2>

            {/* Name */}
            <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Name"
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>
            {/* Email */}
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    value={email} onChange={(e) => setEmail(e.target.value)}

                    placeholder="Enter Email"
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                ></input>
            </div>

            {/* Password */}
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter Passowrd"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>

            {/* Submit Button */}
            <div className="text-center">
                <button
                    type="submit"
                    className="w-full px-6 py-2 font-semibold text-white transition bg-blue-600 rounded-md md:w-auto hover:bg-blue-700"
                >
                    Submit
                </button>
            </div>
        </form>

    )
}
