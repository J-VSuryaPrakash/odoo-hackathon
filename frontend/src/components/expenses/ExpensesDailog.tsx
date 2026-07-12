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

export function ExpenseDialog() {
  const { vehicles, createExpense } = useFleet()

  const [open, setOpen] = useState(false)

  const [vehicleId, setVehicleId] = useState("")

  const [type, setType] = useState("")

  const [amount, setAmount] = useState("")

  const [description, setDescription] = useState("")

  const [date, setDate] = useState("")

  function handleSubmit() {
    const vehicle = vehicles.find((v) => v.id === vehicleId)

    if (!vehicle) {
      toast.error("Select a vehicle")
      return
    }

    if (!type) {
      toast.error("Select expense type")
      return
    }

    createExpense({
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,

      type: type as any,

      amount: Number(amount),

      description,

      date,
    })

    toast.success("Expense added")

    setOpen(false)

    setVehicleId("")
    setType("")
    setAmount("")
    setDescription("")
    setDate("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Expense</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
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

          <Select value={type} onValueChange={setType}>
            <SelectTrigger>
              <SelectValue placeholder="Expense Type" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="FUEL">Fuel</SelectItem>

              <SelectItem value="MAINTENANCE">Maintenance</SelectItem>

              <SelectItem value="TOLL">Toll</SelectItem>

              <SelectItem value="INSURANCE">Insurance</SelectItem>

              <SelectItem value="OTHER">Other</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <Button className="w-full" onClick={handleSubmit}>
            Save Expense
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
