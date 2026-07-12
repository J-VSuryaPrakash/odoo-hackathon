import { useState } from "react"

import { useFleet } from "@/context/FleetContext"

import { toast } from "sonner"

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

export function FuelDialog() {
  const { vehicles, createFuelLog } = useFleet()

  const [vehicleId, setVehicleId] = useState("")

  const [liters, setLiters] = useState("")

  const [fuelCost, setFuelCost] = useState("")

  const [date, setDate] = useState("")

  function handleSubmit() {
    const vehicle = vehicles.find((v) => v.id === vehicleId)

    if (!vehicle) {
      toast.error("Select vehicle")

      return
    }

    createFuelLog({
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,

      liters: Number(liters),

      fuelCost: Number(fuelCost),

      date,
    })

    toast.success("Fuel Log Added")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Log Fuel</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log Fuel</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Select value={vehicleId} onValueChange={setVehicleId}>
            <SelectTrigger>
              <SelectValue placeholder="Vehicle" />
            </SelectTrigger>

            <SelectContent>
              {vehicles.map((vehicle) => (
                <SelectItem key={vehicle.id} value={vehicle.id}>
                  {vehicle.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="number"
            placeholder="Liters"
            value={liters}
            onChange={(e) => setLiters(e.target.value)}
          />

          <Input
            type="number"
            placeholder="Fuel Cost"
            value={fuelCost}
            onChange={(e) => setFuelCost(e.target.value)}
          />

          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <Button className="w-full" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
