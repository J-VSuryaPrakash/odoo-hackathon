import { type Maintenance } from "@/types/maintenance"

export const maintenances: Maintenance[] = [
  {
    id: "M001",
    vehicleId: "3",
    vehicleName: "Mini-08",
    issue: "Engine Service",
    estimatedCost: 15000,
    actualCost: 14000,
    status: "COMPLETED",
    createdAt: "2025-07-10",
  },
]
