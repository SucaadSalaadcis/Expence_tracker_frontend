import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MonthlyExpenseTable from '../pages/expences/MonthlyExpenseTable ';
import MonthlyExpenseChart from '../pages/expences/MonthlyExpenseReport';
import Totals from './Totals';

const Dashboard = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/monthly_expense_report') // Adjust your endpoint
      .then(res => setReportData(res.data.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <Totals />
      <MonthlyExpenseTable data={reportData} />
      <MonthlyExpenseChart data={reportData} />
    </div>
  );
};

export default Dashboard;
