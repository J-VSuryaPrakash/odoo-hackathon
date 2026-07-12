import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useFleet } from "@/context/FleetContext"

export function VehicleDialog() {
  const { createVehicle } = useFleet()

  const [open, setOpen] = useState(false)
  const [registrationNo, setRegistrationNo] = useState("")
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [maxLoadCapacity, setMaxLoadCapacity] = useState("")
  const [odometer, setOdometer] = useState("")
  const [acquisitionCost, setAcquisitionCost] = useState("")
  const [status, setStatus] = useState<
    "AVAILABLE" | "ON_TRIP" | "IN_SHOP" | "RETIRED"
  >("AVAILABLE")

  function resetForm() {
    setRegistrationNo("")
    setName("")
    setType("")
    setMaxLoadCapacity("")
    setOdometer("")
    setAcquisitionCost("")
    setStatus("AVAILABLE")
  }

  function handleSave() {
    if (
      !registrationNo ||
      !name ||
      !type ||
      !maxLoadCapacity ||
      !odometer ||
      !acquisitionCost
    ) {
      return
    }

    createVehicle({
      registrationNo,
      name,
      type,
      maxLoadCapacity: Number(maxLoadCapacity),
      odometer: Number(odometer),
      acquisitionCost: Number(acquisitionCost),
      status,
    })

    resetForm()
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen)

        if (!nextOpen) {
          resetForm()
        }
      }}
    >
      <DialogTrigger asChild>
        <Button>Add Vehicle</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-150">
        <DialogHeader>
          <DialogTitle>Add Vehicle</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="space-y-2">
            <Label>Registration Number</Label>
            <Input
              value={registrationNo}
              onChange={(event) => setRegistrationNo(event.target.value)}
              placeholder="AP39AB1234"
            />
          </div>

          <div className="space-y-2">
            <Label>Vehicle Name</Label>
            <Input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Van-05"
            />
          </div>

          <div className="space-y-2">
            <Label>Vehicle Type</Label>
            <Input
              value={type}
              onChange={(event) => setType(event.target.value)}
              placeholder="Van"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label>Maximum Load Capacity</Label>
              <Input
                type="number"
                value={maxLoadCapacity}
                onChange={(event) => setMaxLoadCapacity(event.target.value)}
                placeholder="500"
              />
            </div>

            <div className="space-y-2">
              <Label>Odometer</Label>
              <Input
                type="number"
                value={odometer}
                onChange={(event) => setOdometer(event.target.value)}
                placeholder="25000"
              />
            </div>

            <div className="space-y-2">
              <Label>Acquisition Cost</Label>
              <Input
                type="number"
                value={acquisitionCost}
                onChange={(event) => setAcquisitionCost(event.target.value)}
                placeholder="1200000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as typeof status)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="AVAILABLE">Available</SelectItem>

                <SelectItem value="ON_TRIP">On Trip</SelectItem>

                <SelectItem value="IN_SHOP">In Shop</SelectItem>

                <SelectItem value="RETIRED">Retired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleSave}>Save Vehicle</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
