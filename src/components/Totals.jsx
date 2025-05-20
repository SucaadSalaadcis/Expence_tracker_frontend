import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Totals() {
    const [usersCount, setUsersCount] = useState(0);
    const [expense, setExpense] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersRes = await axios.get('http://localhost:3000/users');
                setUsersCount(usersRes.data.length);

                const expenseRes = await axios.get('http://localhost:3000/expences');
                const expenses = expenseRes.data.data;
                const total = expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);
                setExpense(total);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const cardData = [
        { label: 'Expenses', value: `$${expense.toLocaleString()}` },
        { label: 'Users', value: usersCount.toLocaleString() },
        { label: 'Totals', value: 'Both E & U' },
    ];

    return (
        <div className="mb-10 ml-5 mr-5">
            <div className="flex flex-wrap justify-center gap-6">
                {cardData.map((item, index) => (
                    <div
                        key={index}
                        className="w-full p-6 transition duration-300 bg-blue-600 shadow-md sm:w-1/2 md:w-1/3 lg:w-1/4 rounded-xl hover:shadow-lg"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-white">{item.label}</span>
                            <span className="px-2 py-1 text-xs bg-blue-100 rounded-full">
                                Yearly
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-white">{item.value}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
