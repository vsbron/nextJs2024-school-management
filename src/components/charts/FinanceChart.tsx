"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    month: "Jan",
    income: 4000,
    expense: 2400,
  },
  {
    month: "Feb",
    income: 3000,
    expense: 1398,
  },
  {
    month: "Mar",
    income: 2000,
    expense: 9800,
  },
  {
    month: "Apr",
    income: 2780,
    expense: 3908,
  },
  {
    month: "May",
    income: 1890,
    expense: 4800,
  },
  {
    month: "Jun",
    income: 2390,
    expense: 3800,
  },
  {
    month: "Jul",
    income: 3490,
    expense: 4300,
  },
  {
    month: "Aug",
    income: 3800,
    expense: 4000,
  },
  {
    month: "Sep",
    income: 6050,
    expense: 4100,
  },
  {
    month: "Oct",
    income: 4175,
    expense: 3200,
  },
  {
    month: "Nov",
    income: 4950,
    expense: 3800,
  },
  {
    month: "Dec",
    income: 6800,
    expense: 2750,
  },
];

function FinanceChart() {
  // Returned JSX
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Finance</h2>
      </div>

      {/* Chart component */}
      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={20}
          />
          <Tooltip />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#a2e1fa"
            strokeWidth={5}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#e0c1fc"
            strokeWidth={5}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default FinanceChart;
