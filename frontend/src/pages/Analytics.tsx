import { FleetKPIs } from "@/components/analytics/FleetKPIs"

import { VehicleStatusChart } from "@/components/analytics/VehicleStatusCharts"

import { TripStatusChart } from "@/components/analytics/TripStatusCharts"

import { ExpenseBreakdownChart } from "@/components/analytics/ExpensesBreakdownChart"

import { MaintenanceCostChart } from "@/components/analytics/maintenanceCostCharts"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>

        <p className="text-muted-foreground">Fleet performance insights</p>
      </div>

      <FleetKPIs />

      <div className="grid gap-6 lg:grid-cols-2">
        <VehicleStatusChart />
        <TripStatusChart />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ExpenseBreakdownChart />
        <MaintenanceCostChart />
      </div>
    </div>
  )
}
