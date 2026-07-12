export type MaintenanceStatus = "OPEN" | "COMPLETED"

export interface Maintenance {
  id: string

  vehicleId: string
  vehicleName: string

  issue: string

  estimatedCost: number

  actualCost?: number

  status: MaintenanceStatus

  createdAt: string
}
