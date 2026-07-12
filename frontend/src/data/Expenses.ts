import { type Expense } from "@/types/expenses"

export const expenses: Expense[] = [
  {
    id: "EXP001",

    tripId: "TR001",

    vehicleId: "1",
    vehicleName: "Van-05",

    toll: 120,

    other: 0,

    maintenanceCost: 0,

    date: "2026-07-05",
  },

  {
    id: "EXP002",

    tripId: "TR002",

    vehicleId: "2",
    vehicleName: "TRK-12",

    toll: 340,

    other: 150,

    maintenanceCost: 18000,

    date: "2026-07-06",
  },
]
