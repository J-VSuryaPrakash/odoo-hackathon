import { createContext, useContext, useState } from "react"

import { drivers as initialDrivers } from "@/data/DriverData"
import { trips as initialTrips } from "@/data/TripsData"
import { vehicles as initialVehicles } from "@/data/vehicleData"

import { type Driver } from "@/types/Driver"
import { type Trip } from "@/types/Trips"
import { type Vehicle } from "@/types/Vehicle"

import { type Maintenance } from "@/types/maintenance"
import { maintenances as initialMaintenances } from "@/data/Maintenance"

interface FleetContextType {
  vehicles: Vehicle[]
  setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>

  drivers: Driver[]
  setDrivers: React.Dispatch<React.SetStateAction<Driver[]>>

  trips: Trip[]
  setTrips: React.Dispatch<React.SetStateAction<Trip[]>>

  maintenances: Maintenance[]

  createMaintenance: (
    maintenance: Omit<Maintenance, "id" | "createdAt">
  ) => void

  completeMaintenance: (maintenanceId: string, actualCost: number) => void

  createTrip: (trip: Omit<Trip, "id" | "createdAt">) => void

  dispatchTrip: (tripId: string) => void

  completeTrip: (tripId: string) => void

  cancelTrip: (tripId: string) => void
}

const FleetContext = createContext<FleetContextType | null>(null)

export function FleetProvider({ children }: { children: React.ReactNode }) {
  const [vehicles, setVehicles] = useState(initialVehicles)

  const [drivers, setDrivers] = useState(initialDrivers)

  const [trips, setTrips] = useState(initialTrips)

  const [maintenances, setMaintenances] = useState(initialMaintenances)

  function createMaintenance(
    maintenanceData: Omit<Maintenance, "id" | "createdAt">
  ) {
    const maintenance: Maintenance = {
      ...maintenanceData,

      id: `M${Date.now()}`,

      createdAt: new Date().toISOString(),
    }

    setMaintenances((prev) => [...prev, maintenance])

    setVehicles((prev) =>
      prev.map((vehicle) =>
        vehicle.id === maintenance.vehicleId
          ? {
              ...vehicle,
              status: "IN_SHOP",
            }
          : vehicle
      )
    )
  }

  function completeMaintenance(maintenanceId: string, actualCost: number) {
    const maintenance = maintenances.find((m) => m.id === maintenanceId)

    if (!maintenance) return

    setMaintenances((prev) =>
      prev.map((m) =>
        m.id === maintenanceId
          ? {
              ...m,
              actualCost,
              status: "COMPLETED",
            }
          : m
      )
    )

    setVehicles((prev) =>
      prev.map((vehicle) =>
        vehicle.id === maintenance.vehicleId
          ? {
              ...vehicle,
              status: "AVAILABLE",
            }
          : vehicle
      )
    )
  }

  function createTrip(tripData: Omit<Trip, "id" | "createdAt">) {
    const trip: Trip = {
      ...tripData,

      id: `TR${Date.now()}`,

      createdAt: new Date().toISOString(),
    }

    setTrips((prev) => [...prev, trip])

    return true
  }

  function dispatchTrip(tripId: string) {
    const trip = trips.find((t) => t.id === tripId)

    if (!trip) return

    setTrips((prev) =>
      prev.map((t) =>
        t.id === tripId
          ? {
              ...t,
              status: "DISPATCHED",
            }
          : t
      )
    )

    setVehicles((prev) =>
      prev.map((vehicle) =>
        vehicle.id === trip.vehicleId
          ? {
              ...vehicle,
              status: "ON_TRIP",
            }
          : vehicle
      )
    )

    setDrivers((prev) =>
      prev.map((driver) =>
        driver.id === trip.driverId
          ? {
              ...driver,
              status: "ON_TRIP",
            }
          : driver
      )
    )
  }

  function completeTrip(tripId: string) {
    const trip = trips.find((t) => t.id === tripId)

    if (!trip) return

    setTrips((prev) =>
      prev.map((t) =>
        t.id === tripId
          ? {
              ...t,
              status: "COMPLETED",
            }
          : t
      )
    )

    setVehicles((prev) =>
      prev.map((vehicle) =>
        vehicle.id === trip.vehicleId
          ? {
              ...vehicle,
              status: "AVAILABLE",
            }
          : vehicle
      )
    )

    setDrivers((prev) =>
      prev.map((driver) =>
        driver.id === trip.driverId
          ? {
              ...driver,
              status: "AVAILABLE",
            }
          : driver
      )
    )
  }

  function cancelTrip(tripId: string) {
    const trip = trips.find((t) => t.id === tripId)

    if (!trip) return

    setTrips((prev) =>
      prev.map((t) =>
        t.id === tripId
          ? {
              ...t,
              status: "CANCELLED",
            }
          : t
      )
    )

    setVehicles((prev) =>
      prev.map((vehicle) =>
        vehicle.id === trip.vehicleId
          ? {
              ...vehicle,
              status: "AVAILABLE",
            }
          : vehicle
      )
    )

    setDrivers((prev) =>
      prev.map((driver) =>
        driver.id === trip.driverId
          ? {
              ...driver,
              status: "AVAILABLE",
            }
          : driver
      )
    )
  }

  return (
    <FleetContext.Provider
      value={{
        vehicles,
        setVehicles,

        drivers,
        setDrivers,

        trips,
        setTrips,

        createTrip,
        dispatchTrip,
        completeTrip,
        cancelTrip,

        maintenances,
        createMaintenance,
        completeMaintenance,
      }}
    >
      {children}
    </FleetContext.Provider>
  )
}

export function useFleet() {
  const context = useContext(FleetContext)

  if (!context) {
    throw new Error("useFleet must be used inside FleetProvider")
  }

  return context
}
