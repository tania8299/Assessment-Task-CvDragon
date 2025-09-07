import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useState } from "react";
import dashboardData from "../../data/dashboardData.json";

export default function ChartsSection() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [chartPeriod, setChartPeriod] = useState("Monthly");
  const [roomPeriod, setRoomPeriod] = useState("Monthly");
  const [openDropdown, setOpenDropdown] = useState(null);

  const options = ["Weekly", "Monthly", "Yearly"];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-2">
      <div className="lg:col-span-2 bg-white shadow rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2 relative">
          <h3 className="font-semibold text-lg text-black">Collection of Rooms</h3>
          <div className="relative">
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "chart" ? null : "chart")
              }
              className="text-sm border rounded-lg px-3 cursor-pointer py-1 text-gray-600 bg-gray-50 flex items-center gap-1"
            >
              {chartPeriod} ▾
            </button>
            {openDropdown === "chart" && (
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
                {options.map((option) => (
                  <div
                    key={option}
                    onClick={() => {
                      setChartPeriod(option);
                      setOpenDropdown(null);
                    }}
                    className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                      chartPeriod === option
                        ? "bg-yellow-50 text-yellow-600 font-medium"
                        : ""
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dashboardData.chartData[chartPeriod]}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f3f4f6"
              />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis
                domain={[0, 60000]}
                ticks={[0, 10000, 20000, 30000, 40000, 50000, 60000]}
                tickFormatter={(value) => `${value / 1000}k`}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(value) => `$${value.toLocaleString("en-US")}`}
                contentStyle={{
                  backgroundColor: "black",
                  borderRadius: "6px",
                  color: "white",
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{
                  r: 5,
                  stroke: "#f59e0b",
                  strokeWidth: 2,
                  fill: "#fff",
                }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white shadow rounded-2xl p-4">
        <div className="flex items-center justify-between mb-4 relative">
          <h3 className="font-semibold text-lg md:font-medium md:text-sm">Room Occupancy</h3>
          <div className="relative">
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "room" ? null : "room")
              }
              className="text-sm md:text-xs md:gap-0 border cursor-pointer rounded-lg px-3 md:px-2 py-1 text-gray-600 bg-gray-50 flex items-center gap-1"
            >
              {roomPeriod} ▾
            </button>
            {openDropdown === "room" && (
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
                {options.map((option) => (
                  <div
                    key={option}
                    onClick={() => {
                      setRoomPeriod(option);
                      setOpenDropdown(null);
                    }}
                    className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                      roomPeriod === option
                        ? "bg-yellow-50 text-yellow-600 font-medium"
                        : ""
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-6 md:text-xs text-sm font-semibold text-gray-700 bg-orange-50 rounded-lg px-3 py-3 mb-2">
          <span className="col-span-2">Room Category</span>
          <span className="col-span-2 text-center">Total Count</span>
          <span className="col-span-2 text-right">Occupancy Rate</span>
        </div>
        <div className="space-y-2 mt-2">
          {dashboardData.roomData[roomPeriod].map((room, i) => (
            <div
              key={i}
              onClick={() => setSelectedRow(i)}
              className={`grid grid-cols-6 items-center px-3 py-3 rounded-lg border transition cursor-pointer ${
                selectedRow === i
                  ? "border-yellow-400 shadow-md "
                  : "border-gray-200 hover:shadow"
              }`}
            >
              <span className="col-span-2 text-xs text-black">
                {room.category}
              </span>
              <span className="col-span-2 text-xs text-center text-black">
                {room.count}
              </span>
              <span className="col-span-2 text-xs text-right text-black">
                {room.rate}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
