
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

import Swal from "sweetalert2";

const ExpenseTable = () => {

  const [expenses, setExpenses] = useState([]);

  const navigate = useNavigate();

  const getAllData = () => {
    axios.get('http://localhost:3000/expences')
      .then((res) => {
        setExpenses(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }
  useEffect(() => {
    getAllData()
  }, []);

  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', ...new Set(expenses.map(item => item.category))];

  const filteredExpenses = expenses.filter((expense) => {
    const matchesTitle = expense.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === 'All' || expense.category === filterCategory;
    return matchesTitle && matchesCategory;
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
          .delete(`http://localhost:3000/expence/${id}`)
          .then(() => {
            getAllData();
            Swal.fire("Deleted!", "Your data has been deleted.", "success");
            navigate('/expenses');
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
      <h1 className="mb-5 text-3xl font-bold text-center text-gray-800">Expense Tracker</h1>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <Link to={'/createE'}>
          <button className="flex items-center gap-2 px-4 py-2 text-base text-white bg-blue-600 rounded hover:bg-blue-700">
            <FaPlus />
            Add
          </button>
        </Link>

        <div className="flex gap-3 text-base">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border border-gray-300 rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="px-4 py-2 border border-gray-300 rounded"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Desktop Table */}
      <table className="hidden w-full text-base bg-white border-2 border-gray-900 rounded md:table">
        <thead className="text-lg text-blue-800 bg-blue-100">
          <tr>
            <th className="px-4 py-3 border-2 border-gray-900">Amount ($)</th>
            <th className="px-4 py-3 border-2 border-gray-900">Category</th>
            <th className="px-4 py-3 border-2 border-gray-900">Date</th>
            <th className="px-4 py-3 border-2 border-gray-900">Description</th>
            <th className="px-4 py-3 border-2 border-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.length === 0 ? (
            <tr>
              <td colSpan="5" className="px-4 py-4 text-center text-gray-500 border-2 border-gray-400">
                No expenses found.
              </td>
            </tr>
          ) : (
            filteredExpenses.map(expense => (
              <tr key={expense._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-center text-green-600 border-2 border-gray-400">
                  ${expense.amount.toFixed(2)}
                </td>
                <td className="px-4 py-2 text-center border-2 border-gray-400">{expense.category}</td>
                <td className="px-4 py-2 text-center border-2 border-gray-400">{expense.date}</td>
                <td className="px-4 py-2 text-center border-2 border-gray-400">{expense.description}</td>
                <td className="px-4 py-2 text-center border-2 border-gray-400">
                  <div className="flex justify-center gap-4">
                    <Link to={`/editE/${expense._id}`}>
                      <button className="text-xl text-yellow-600 hover:text-yellow-800">
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      className="text-xl text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(expense._id)}
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
        {filteredExpenses.length === 0 ? (
          <div className="text-center text-gray-500">No expenses found.</div>
        ) : (
          filteredExpenses.map(expense => (
            <div key={expense._id} className="p-4 bg-white border rounded shadow-sm">
              <div className="flex justify-between">
                <span className="font-bold text-green-600">${expense.amount.toFixed(2)}</span>
                <div className="flex gap-3">
                  <Link to={`/editE/${expense._id}`}>
                    <button className="text-yellow-600 hover:text-yellow-800">
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(expense._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-600">Category: {expense.category}</p>
              <p className="text-sm text-gray-600">Date: {expense.date}</p>
              <p className="mt-1 text-sm text-gray-700">{expense.description}</p>
            </div>
          ))
        )}
      </div>
    </div>


  );
};

export default ExpenseTable;



