import { useState } from "react"

import { useFleet } from "@/context/FleetContext"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { toast } from "sonner"

export function AddTripDialog() {
  const { vehicles, drivers, createTrip } = useFleet()

  const [open, setOpen] = useState(false)

  const [vehicleId, setVehicleId] = useState("")

  const [driverId, setDriverId] = useState("")

  const [origin, setOrigin] = useState("")

  const [destination, setDestination] = useState("")

  const [cargoWeight, setCargoWeight] = useState("")

  const [estimatedDistance, setEstimatedDistance] = useState("")

  const availableVehicles = vehicles.filter(
    (vehicle) => vehicle.status === "AVAILABLE"
  )

  const availableDrivers = drivers.filter(
    (driver) => driver.status === "AVAILABLE"
  )

  function handleCreateTrip() {
    const vehicle = vehicles.find((v) => v.id === vehicleId)

    const driver = drivers.find((d) => d.id === driverId)

    if (!vehicle) {
      toast.error("Select a vehicle")

      return
    }

    if (!driver) {
      toast.error("Select a driver")

      return
    }

    const cargo = Number(cargoWeight)

    if (cargo > vehicle.maxLoadCapacity) {
      toast.error(
        `Cargo exceeds vehicle capacity (${vehicle.maxLoadCapacity} KG)`
      )

      return
    }

    createTrip({
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,

      driverId: driver.id,
      driverName: driver.name,

      origin,
      destination,

      cargoWeight: cargo,

      estimatedDistance: Number(estimatedDistance),

      status: "DRAFT",
    })

    toast.success("Trip created successfully")

    setOpen(false)

    setVehicleId("")
    setDriverId("")
    setOrigin("")
    setDestination("")
    setCargoWeight("")
    setEstimatedDistance("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
        Create Trip
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Trip</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Select
            value={vehicleId}
            onValueChange={(value) => setVehicleId(value ?? "")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Vehicle" />
            </SelectTrigger>

            <SelectContent>
              {availableVehicles.map((vehicle) => (
                <SelectItem key={vehicle.id} value={vehicle.id}>
                  {vehicle.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={driverId}
            onValueChange={(value) => setDriverId(value ?? "")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Driver" />
            </SelectTrigger>

            <SelectContent>
              {availableDrivers.map((driver) => (
                <SelectItem key={driver.id} value={driver.id}>
                  {driver.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder="Origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />

          <Input
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />

          <Input
            type="number"
            placeholder="Cargo Weight (KG)"
            value={cargoWeight}
            onChange={(e) => setCargoWeight(e.target.value)}
          />

          <Input
            type="number"
            placeholder="Estimated Distance (KM)"
            value={estimatedDistance}
            onChange={(e) => setEstimatedDistance(e.target.value)}
          />

          <Button className="w-full" onClick={handleCreateTrip}>
            Create Draft Trip
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
