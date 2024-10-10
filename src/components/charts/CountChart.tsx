"use client";
import Image from "next/image";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

import { CountChartProps } from "@/lib/types";

function CountChart({ boys, girls }: CountChartProps) {
  // Preparing data for the chart
  const data = [
    {
      name: "Total",
      count: boys + girls,
      fill: "white",
    },
    {
      name: "Girls",
      count: girls,
      fill: "var(--school-orange)",
    },
    {
      name: "Boys",
      count: boys,
      fill: "var(--school-sky)",
    },
  ];

  // Returned JSX
  return (
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
        src="/maleFemale.svg"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        alt=""
        width={50}
        height={50}
      />
    </div>
  );
}

export default CountChart;
