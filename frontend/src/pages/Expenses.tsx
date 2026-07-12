import { useFleet } from "@/context/FleetContext"

import { FuelLogsTable } from "@/components/expenses/FuelLogsTable"

import { ExpenseTable } from "@/components/expenses/ExpensesTable"

import { FuelDialog } from "@/components/expenses/FuelLogDailog"

import { ExpenseDialog } from "@/components/expenses/ExpensesDailog"

export default function ExpensesPage() {
  const { fuelLogs, expenses } = useFleet()

  const totalFuelCost = fuelLogs.reduce((sum, log) => sum + log.fuelCost, 0)

  const totalMaintenanceCost = expenses.reduce(
    (sum, expense) => sum + expense.maintenanceCost,
    0
  )

  const totalOperationalCost = totalFuelCost + totalMaintenanceCost

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Fuel & Expenses</h1>

          <p className="text-muted-foreground">Track operational costs</p>
        </div>

        <div className="flex gap-2">
          <FuelDialog />

          <ExpenseDialog />
        </div>
      </div>

      {/* Fuel Logs */}

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Fuel Logs</h2>

        <FuelLogsTable fuelLogs={fuelLogs} />
      </section>

      {/* Other Expenses */}

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Other Expenses (Toll / Misc)</h2>

        <ExpenseTable expenses={expenses} />
      </section>

      {/* Total Operational Cost */}

      <div className="border-t pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-medium">Total Operational Cost</p>

            <p className="text-sm text-muted-foreground">Fuel + Maintenance</p>
          </div>

          <p className="text-3xl font-bold text-orange-500">
            ₹{totalOperationalCost.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}
