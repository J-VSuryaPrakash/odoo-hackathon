export type VehicleStatus = "AVAILABLE" | "ON_TRIP" | "IN_SHOP" | "RETIRED"

export interface Vehicle {
  id: string

  registrationNo: string

  name: string

  type: string

  maxLoadCapacity: number

  odometer: number

  acquisitionCost: number

  status: VehicleStatus
}
