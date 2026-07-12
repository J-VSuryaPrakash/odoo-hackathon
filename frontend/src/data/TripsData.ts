import { type Trip } from "@/types/Trips"

export const trips: Trip[] = [
  {
    id: "TR001",
    vehicleId: "1",
    vehicleName: "Vehicle 1",
    driverId: "1",
    driverName: "Driver 1",
    origin: "Hyderabad",
    destination: "Vijayawada",
    cargoWeight: 400,
    estimatedDistance: 275,
    status: "DISPATCHED",
  },
  {
    id: "TR002",
    vehicleId: "2",
    vehicleName: "Vehicle 2",
    driverId: "2",
    driverName: "Driver 2",
    origin: "Vizag",
    destination: "Srikakulam",
    cargoWeight: 700,
    estimatedDistance: 120,
    status: "DRAFT",
  },
]
