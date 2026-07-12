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
  {
    id: "EXP003",
    tripId: "TR003",
    vehicleId: "3",
    vehicleName: "Mini-08",
    toll: 85,
    other: 40,
    maintenanceCost: 2500,
    date: "2026-07-07",
  },
  {
    id: "EXP004",
    tripId: "TR004",
    vehicleId: "4",
    vehicleName: "Truck-18",
    toll: 210,
    other: 125,
    maintenanceCost: 0,
    date: "2026-07-08",
  },
  {
    id: "EXP005",
    tripId: "TR005",
    vehicleId: "5",
    vehicleName: "Van-11",
    toll: 70,
    other: 30,
    maintenanceCost: 0,
    date: "2026-07-09",
  },
  {
    id: "EXP006",
    tripId: "TR006",
    vehicleId: "6",
    vehicleName: "Truck-24",
    toll: 260,
    other: 150,
    maintenanceCost: 0,
    date: "2026-07-10",
  },
  {
    id: "EXP007",
    tripId: "TR007",
    vehicleId: "8",
    vehicleName: "Mini-14",
    toll: 55,
    other: 25,
    maintenanceCost: 0,
    date: "2026-07-11",
  },
]
