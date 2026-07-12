// src/data/vehicles.ts

import { type Vehicle } from "@/types/Vehicle"

export const vehicles: Vehicle[] = [
  {
    id: "1",
    registrationNo: "AP39AB1234",
    name: "Van-05",
    type: "Van",
    maxLoadCapacity: 500,
    odometer: 25000,
    acquisitionCost: 1200000,
    status: "AVAILABLE",
  },
  {
    id: "2",
    registrationNo: "AP39XY9999",
    name: "Truck-12",
    type: "Truck",
    maxLoadCapacity: 1200,
    odometer: 80000,
    acquisitionCost: 3500000,
    status: "ON_TRIP",
  },
]
