import { useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function ChartSetup({ charts }) {
  if (!charts || charts.length === 0) return null;

  const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4"];

  const [radius, setRadius] = useState(100);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setRadius(75); // mobile
      } else {
        setRadius(100); // desktop
      }
    };

    handleResize(); // run once

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="space-y-8">
      {charts.map((c, index) => (
        <div
          key={index}
          className="group border border-gray-200 rounded-2xl p-3 bg-white hover:shadow-xl hover:border-indigo-200 transition-all duration-300 focus:outline-none"
        >
          <h4 className="font-semibold text-gray-800 mb-1">{c.title}</h4>

          <div className="h-72 w-full min-w-0 select-none">
            <ResponsiveContainer width={"100%"} height={"100%"}>
              {/* BAR Chart */}
              {c.type === "bar" && (
                <BarChart data={c.data}>
                  <XAxis dataKey={"name"} />

                  <YAxis />

                  <Tooltip />

                  <Bar dataKey={"value"} radius={[6, 6, 0, 0]}>
                    {c.data.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              )}

              {/* LINE Chart */}
              {c.type === "line" && (
                <LineChart data={c.data}>
                  <XAxis dataKey={"name"} />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type={"monotone"}
                    dataKey={"value"}
                    stroke="#6366f1"
                    strokeWidth={3}
                  />
                </LineChart>
              )}

              {/* PIE Chart */}
              {c.type === "pie" && (
                <PieChart>
                  <Tooltip />

                  <Pie
                    data={c.data}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={radius}
                    label
                  >
                    {c.data.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChartSetup;
