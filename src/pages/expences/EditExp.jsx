import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom';

export default function EditExp() {

    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const params = useParams();
    const navigate = useNavigate();

    const handleSingleData = () => {
        axios.get(`http://localhost:3000/expence/${params.id}`)
            .then(res => {
                if (res.data && res.data.expence) {
                    setAmount(res.data.expence.amount);
                    setCategory(res.data.expence.category || '');
                    setDescription(res.data.expence.description || '');
                    setDate(res.data.expence.date?.slice(0, 10));
                } else {
                    toast.error("Expense not found");
                    navigate("/expenses");
                }
            })
            .catch(err => {
                console.error(err);
                toast.error("Failed to load expense");
                navigate("/expenses"); 
            });
    };

    useEffect(() => {
        handleSingleData();
    }, []);


    const handleEditExpence = (e) => {
        e.preventDefault();
        const data = {
            amount,
            category,
            description,
            date,
        };

        axios.put(`http://localhost:3000/expence/${params.id}`, data).then(() => {
            navigate("/expenses"); 
             toast.success("Updated Successfully...");
        }).catch((error) => {
            alert('An error happened. Please Chack console');
            console.log(error);
        });
    };


    return (
        <form className="max-w-3xl p-8 mx-auto mt-10 space-y-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-800">Edit Expense</h2>

            {/* Amount */}
            <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                    Amount
                </label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={amount} onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>

            {/* Category */}
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                </label>
                <select
                    id="category"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                >
                    <option value="">Select category</option>
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                    <option value="Bills">Bills</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            {/* Date */}
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Date
                </label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={date} onChange={(e) => setDate(e.target.value)}
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>

            {/* Description */}
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={description} onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                    placeholder="Enter description"
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
                <button
                    onClick={handleEditExpence}
                    type="submit"
                    className="w-full px-6 py-2 font-semibold text-white transition bg-blue-600 rounded-md md:w-auto hover:bg-blue-700"
                >
                    Submit
                </button>
            </div>
        </form>

    )
}
