import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"

export function DriverDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Driver</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Driver</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input placeholder="Driver Name" />

          <Input placeholder="License Number" />

          <Input placeholder="License Category" />

          <Input type="date" placeholder="License Expiry" />

          <Input placeholder="Contact Number" />

          <Button className="w-full">Save Driver</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
