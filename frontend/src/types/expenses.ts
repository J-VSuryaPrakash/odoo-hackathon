export type ExpenseType =
  "FUEL" | "MAINTENANCE" | "TOLL" | "INSURANCE" | "OTHER"

  export interface Expense {
    id: string

    tripId: string

    vehicleId: string
    vehicleName: string

    toll: number

    other: number

    maintenanceCost: number

    date: string
  }
