export type TripStatus = "DRAFT" | "DISPATCHED" | "COMPLETED" | "CANCELLED"

export interface Trip {
  id: string

  vehicleId: string
  vehicleName: string

  driverId: string
  driverName: string

  origin: string
  destination: string

  cargoWeight: number
  estimatedDistance: number

  status: TripStatus
  createdAt: string
}
