import { useFleet } from "@/context/FleetContext"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export function MaintenanceCostChart() {
  const { maintenances } = useFleet()

  const data = maintenances.map((m) => ({
    id: m.id,
    cost: m.actualCost ?? m.estimatedCost,
  }))

  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-4 font-semibold">Maintenance Cost</h3>

      <div className="h-[300px]">
        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis dataKey="id" />
            <YAxis />
            <Tooltip />

            <Line
              dataKey="cost"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={{
                r: 6,
                fill: "#f59e0b",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
