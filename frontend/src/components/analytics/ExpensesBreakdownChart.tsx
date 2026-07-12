import { useFleet } from "@/context/FleetContext"

import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts"

export function ExpenseBreakdownChart() {
  const { expenses } = useFleet()

  const toll = expenses.reduce((sum, e) => sum + e.toll, 0)

  const other = expenses.reduce((sum, e) => sum + e.other, 0)

  const maintenance = expenses.reduce((sum, e) => sum + e.maintenanceCost, 0)

  const data = [
    {
      name: "Toll",
      value: toll,
    },
    {
      name: "Other",
      value: other,
    },
    {
      name: "Maintenance",
      value: maintenance,
    },
  ]

  const COLORS = [
    "#06b6d4", // Fuel

    "#f59e0b", // Toll

    "#a855f7", // Maintenance

    "#64748b", // Other
  ]

  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-4 font-semibold">Expense Breakdown</h3>

      <div className="mt-4 flex flex-wrap gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-cyan-500" />
          <span>Fuel</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-orange-500" />
          <span>Toll</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-purple-500" />
          <span>Maintenance</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-slate-500" />
          <span>Other</span>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" outerRadius={100}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
              <Tooltip />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
