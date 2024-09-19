/* eslint-disable react/prop-types */
import { Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export const PieChartComponent = ({ data, colors, label }) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={label === "Expense Form Status Overview" ? 100 : 120}
        innerRadius={label === "Expense Form Status Overview" ? 60 : 0}
        fill="#8884d8"
        label
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
);
