import { useFleet } from "@/context/FleetContext"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

export function VehicleStatusChart() {
  const { vehicles } = useFleet()

  const data = [
    {
      name: "Available",
      value: vehicles.filter((v) => v.status === "AVAILABLE").length,
    },

    {
      name: "On Trip",
      value: vehicles.filter((v) => v.status === "ON_TRIP").length,
    },

    {
      name: "In Shop",
      value: vehicles.filter((v) => v.status === "IN_SHOP").length,
    },
  ]

  const COLORS = [
    "#22c55e", // Available

    "#3b82f6", // On Trip

    "#f59e0b", // In Shop
  ]

  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-4 font-semibold">Vehicle Status</h3>

      <div className="mt-4 flex gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-500" />
          Available
        </div>

        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-blue-500" />
          On Trip
        </div>

        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-orange-500" />
          In Shop
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" outerRadius={100}>
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
