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

export function AddMaintenanceDialog() {
  const { vehicles, createMaintenance } = useFleet()

  const [open, setOpen] = useState(false)

  const [vehicleId, setVehicleId] = useState("")

  const [issue, setIssue] = useState("")

  const [estimatedCost, setEstimatedCost] = useState("")

  const availableVehicles = vehicles.filter(
    (vehicle) => vehicle.status === "AVAILABLE"
  )

  function handleSubmit() {
    const vehicle = vehicles.find((v) => v.id === vehicleId)

    if (!vehicle) {
      toast.error("Select a vehicle")
      return
    }

    createMaintenance({
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,

      issue,

      estimatedCost: Number(estimatedCost),

      status: "OPEN",
    })

    toast.success("Maintenance created")

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Maintenance</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Maintenance</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Select value={vehicleId} onValueChange={setVehicleId}>
            <SelectTrigger>
              <SelectValue placeholder="Vehicle" />
            </SelectTrigger>

            <SelectContent>
              {availableVehicles.map((vehicle) => (
                <SelectItem key={vehicle.id} value={vehicle.id}>
                  {vehicle.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder="Issue"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
          />

          <Input
            type="number"
            placeholder="Estimated Cost"
            value={estimatedCost}
            onChange={(e) => setEstimatedCost(e.target.value)}
          />

          <Button onClick={handleSubmit}>Create</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
