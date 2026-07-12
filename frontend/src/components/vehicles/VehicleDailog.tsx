import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function VehicleDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Vehicle</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Vehicle</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <Input placeholder="Registration Number" />

          <Input placeholder="Vehicle Name" />

          <Input placeholder="Vehicle Type" />

          <Input type="number" placeholder="Maximum Load Capacity" />

          <Input type="number" placeholder="Odometer" />

          <Input type="number" placeholder="Acquisition Cost" />

          <Select>
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

          <Button>Save Vehicle</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
