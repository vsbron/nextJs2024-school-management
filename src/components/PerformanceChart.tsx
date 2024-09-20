"use client";
import Image from "next/image";

import { PieChart, Pie, ResponsiveContainer } from "recharts";

// Data for performance
const data = [
  { name: "1st Semester", value: 92, fill: "#c3ebfa" },
  { name: "2st Semester", value: 8, fill: "#fae27c" },
];

function PerformanceChart() {
  // Returned JSX
  return (
    <div className="bg-white rounded-xl h-80 p-4 relative">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Performance</h2>
        <Image src="/moreDark.png" width={20} height={20} alt="More" />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            fill="#8884d8"
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <h4 className="text-3xl font-bold">9.2</h4>
        <p className="text-xs text-gray-300">of 10 max LTS</p>
      </div>
      <div className="font-medium absolute bottom-16 left-0 right-0 text-center margin-auto">
        1st Semester - 2nd Semester
      </div>
    </div>
  );
}

export default PerformanceChart;
