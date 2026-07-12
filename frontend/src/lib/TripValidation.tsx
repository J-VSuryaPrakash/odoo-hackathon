import { type Driver } from "@/types/Driver"
import { type Vehicle } from "@/types/Vehicle"

export function validateTripAssignment(
  vehicle: Vehicle,
  driver: Driver,
  cargoWeight: number
) {
  if (vehicle.status !== "AVAILABLE") {
    return {
      valid: false,
      message: "Vehicle is not available",
    }
  }

  if (driver.status !== "AVAILABLE") {
    return {
      valid: false,
      message: "Driver is not available",
    }
  }

  if (cargoWeight > vehicle.maxLoadCapacity) {
    return {
      valid: false,
      message: "Cargo exceeds vehicle capacity",
    }
  }

  return {
    valid: true,
    message: "",
  }
}
