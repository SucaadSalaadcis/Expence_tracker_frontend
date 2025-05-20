import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const getAllData = () => {
        axios.get('http://localhost:3000/users')
            .then((res) => {
                console.log('API response:', res.data);
                setUsers(res.data || []);
            })
            .catch((error) => {
                console.log(error);
                setUsers([]);
            });
    };

    useEffect(() => {
        getAllData();
    }, []);

    const [search, setSearch] = useState('');
    const [filterName, setFilterName] = useState('All');

    // Create a list of unique names for filtering
    const names = ['All', ...new Set(users.map(user => user.name))];

    // Filter users by search and filterName
    const filteredUsers = users.filter(user => {
        const matchesEmail = user.email.toLowerCase().includes(search.toLowerCase());
        const matchesName = filterName === 'All' || user.name === filterName;
        return matchesEmail && matchesName;
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`http://localhost:3000/user/${id}`)
                    .then(() => {
                        getAllData();
                        Swal.fire("Deleted!", "Your data has been deleted.", "success");
                        navigate('/users');
                    })
                    .catch((error) => {
                        console.error("Error deleting the record:", error);
                        Swal.fire(
                            "Error!",
                            error.response?.data?.message || "Failed to delete the record.",
                            "error"
                        );
                    });
            }
        });
    };

    return (
        <div className="max-w-6xl p-6 mx-auto">
            <h1 className="mb-5 text-3xl font-bold text-center text-gray-800">Users List</h1>

            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <Link to={'/createUser'}>
                    <button className="flex items-center gap-2 px-4 py-2 text-base text-white bg-blue-600 rounded hover:bg-blue-700">
                        <FaPlus />
                        Add
                    </button>
                </Link>

                <div className="flex gap-3 text-base">
                    <input
                        type="text"
                        placeholder="Search by email..."
                        className="px-4 py-2 border border-gray-300 rounded"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select
                        className="px-4 py-2 border border-gray-300 rounded"
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                    >
                        {names.map(name => (
                            <option key={name} value={name}>{name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Desktop Table */}
            <table className="hidden w-full text-base bg-white border-2 border-gray-900 rounded md:table">
                <thead className="text-lg text-blue-800 bg-blue-100">
                    <tr>
                        <th className="px-4 py-3 border-2 border-gray-900">Name</th>
                        <th className="px-4 py-3 border-2 border-gray-900">Email</th>
                        <th className="px-4 py-3 border-2 border-gray-900">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="px-4 py-4 text-center text-gray-500 border-2 border-gray-400">
                                No users found.
                            </td>
                        </tr>
                    ) : (
                        filteredUsers.map(user => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 text-center border-2 border-gray-400">{user.name}</td>
                                <td className="px-4 py-2 text-center border-2 border-gray-400">{user.email}</td>
                                <td className="px-4 py-2 text-center border-2 border-gray-400">
                                    <div className="flex justify-center gap-4">
                                        <button
                                            className="text-xl text-red-600 hover:text-red-800"
                                            onClick={() => handleDelete(user._id)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Mobile Cards */}
            <div className="space-y-4 md:hidden">
                {filteredUsers.length === 0 ? (
                    <div className="text-center text-gray-500">No users found.</div>
                ) : (
                    filteredUsers.map(user => (
                        <div key={user._id} className="p-4 bg-white border rounded shadow-sm">
                            <div className="flex justify-between">
                                <span className="font-bold">{user.name}</span>
                                <div className="flex gap-3">

                                    <button
                                        className="text-red-600 hover:text-red-800"
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                            <p className="mt-1 text-sm text-gray-600">Email: {user.email}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default UsersList;
