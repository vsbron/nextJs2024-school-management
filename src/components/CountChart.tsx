"use client";
import Image from "next/image";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "Total",
    count: 200,
    fill: "white",
  },
  {
    name: "Girls",
    count: 90,
    fill: "#fae27c",
  },
  {
    name: "Boys",
    count: 110,
    fill: "#c3ebfa",
  },
];

function CountChart() {
  // Returned JSX
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Students</h2>
        <Image src="/moreDark.png" width={20} height={20} alt="More" />
      </div>
      {/* CHART */}
      <div className="relative w-full h-[75%]">
        {/* Chart component */}
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src="/maleFemale.png"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          alt=""
          width={50}
          height={50}
        />
      </div>
      {/* BOTTOM */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-schoolSky rounded-full" />
          <h3 className="font-bold">1,200</h3>
          <h4 className="text-xs text-gray-300">Boys (55%)</h4>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-schoolYellow rounded-full" />
          <h3 className="font-bold">900</h3>
          <h4 className="text-xs text-gray-300">Girls (45%)</h4>
        </div>
      </div>
    </div>
  );
}

export default CountChart;
