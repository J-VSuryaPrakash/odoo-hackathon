export type DriverStatus = "AVAILABLE" | "ON_TRIP" | "OFF_DUTY" | "SUSPENDED"

export interface Driver {
  id: string
  userId: string
  name: string
  licenseNumber: string
  licenseCategory: string
  licenseExpiry: string
  contactNumber: string
  safetyScore: number
  status: DriverStatus
}
