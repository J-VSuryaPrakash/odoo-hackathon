import { useFleet } from "@/context/FleetContext"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"

export function TripStatusChart() {
  const { trips } = useFleet()

  const data = [
    {
      status: "Draft",
      count: trips.filter((t) => t.status === "DRAFT").length,
    },

    {
      status: "Dispatched",
      count: trips.filter((t) => t.status === "DISPATCHED").length,
    },

    {
      status: "Completed",
      count: trips.filter((t) => t.status === "COMPLETED").length,
      },

    {
      status: "Cancelled",
      count: trips.filter((t) => t.status === "CANCELLED").length,
    },
  ]

  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-4 font-semibold">Trip Status</h3>

      <div className="h-[300px]">
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              <Cell fill="#94a3b8" /> // Draft
              <Cell fill="#3b82f6" /> // Dispatched
              <Cell fill="#22c55e" /> // Completed
              <Cell fill="#ef4444" /> // Cancelled
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
