import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MonthlyExpenseTable = () => {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get('http://localhost:3000/monthly_expense_report');
        setReport(res.data.data); 
      } catch (err) {
        setError('Failed to load report');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading) return <p>Loading monthly report...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-4xl p-6 mx-auto bg-white rounded shadow">
      <h2 className="mb-4 text-2xl font-semibold text-center text-gray-800">Monthly Expense Report</h2>

      {report.length === 0 ? (
        <p className="text-center text-gray-500">No expenses found.</p>
      ) : (
        <table className="w-full border border-collapse border-gray-300">
          <thead>
            <tr className="text-blue-900 bg-blue-100">
              <th className="px-4 py-2 text-left border border-gray-300">Month</th>
              <th className="px-4 py-2 text-right border border-gray-300">Total Amount ($)</th>
              <th className="px-4 py-2 text-right border border-gray-300">Number of Expenses</th>
            </tr>
          </thead>
          <tbody>
            {report.map(({ month, totalAmount, count }) => (
              <tr key={month} className="hover:bg-gray-100">
                <td className="px-4 py-2 border border-gray-300">{month}</td>
                <td className="px-4 py-2 text-right border border-gray-300">${totalAmount.toFixed(2)}</td>
                <td className="px-4 py-2 text-right border border-gray-300">{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MonthlyExpenseTable;
