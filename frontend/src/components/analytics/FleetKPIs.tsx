import { useFleet } from "@/context/FleetContext"

export function FleetKPIs() {
  const { vehicles, drivers, trips, expenses } = useFleet()

  const totalExpense = expenses.reduce(
    (sum, expense) =>
      sum + expense.toll + expense.other + expense.maintenanceCost,
    0
  )

  const cards = [
    {
      title: "Vehicles",
      value: vehicles.length,
    },
    {
      title: "Drivers",
      value: drivers.length,
    },
    {
      title: "Trips",
      value: trips.length,
    },
    {
      title: "Expenses",
      value: `₹${totalExpense.toLocaleString()}`,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {cards.map((card) => (
        <div key={card.title} className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">{card.title}</p>

          <p className="mt-2 text-3xl font-bold">{card.value}</p>
        </div>
      ))}
    </div>
  )
}
