
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EFF', '#FF6F91'];

const MonthlyExpensePieChart = ({ data }) => (
  <div style={{ width: '100%', maxWidth: 800, margin: '0 auto' }}>
    <h2 className="mt-20 text-2xl font-semibold text-center text-gray-800">
      Monthly Expense Report Using Pie Chart
    </h2>
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="totalAmount"
          nameKey="month"
          cx="50%"
          cy="50%"
          outerRadius="80%"  // use percentage for better scaling
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default MonthlyExpensePieChart;

