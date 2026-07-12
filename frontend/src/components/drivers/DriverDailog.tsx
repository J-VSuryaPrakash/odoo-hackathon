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

import { useFleet } from "@/context/FleetContext"

export function DriverDialog() {
  const { createDriver } = useFleet()

  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [licenseNumber, setLicenseNumber] = useState("")
  const [licenseCategory, setLicenseCategory] = useState("")
  const [licenseExpiry, setLicenseExpiry] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [safetyScore, setSafetyScore] = useState("")

  function resetForm() {
    setName("")
    setLicenseNumber("")
    setLicenseCategory("")
    setLicenseExpiry("")
    setContactNumber("")
    setSafetyScore("")
  }

  function handleSave() {
    if (
      !name ||
      !licenseNumber ||
      !licenseCategory ||
      !licenseExpiry ||
      !contactNumber ||
      !safetyScore
    ) {
      return
    }

    createDriver({
      userId: `user-${Date.now()}`,
      name,
      licenseNumber,
      licenseCategory,
      licenseExpiry,
      contactNumber,
      safetyScore: Number(safetyScore),
      status: "AVAILABLE",
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
        <Button>Add Driver</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Driver</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Driver Name</Label>
            <Input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Alex Johnson"
            />
          </div>

          <div className="space-y-2">
            <Label>License Number</Label>
            <Input
              value={licenseNumber}
              onChange={(event) => setLicenseNumber(event.target.value)}
              placeholder="DL123456"
            />
          </div>

          <div className="space-y-2">
            <Label>License Category</Label>
            <Input
              value={licenseCategory}
              onChange={(event) => setLicenseCategory(event.target.value)}
              placeholder="Heavy"
            />
          </div>

          <div className="space-y-2">
            <Label>License Expiry</Label>
            <Input
              type="date"
              value={licenseExpiry}
              onChange={(event) => setLicenseExpiry(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Contact Number</Label>
            <Input
              value={contactNumber}
              onChange={(event) => setContactNumber(event.target.value)}
              placeholder="9876543210"
            />
          </div>

          <div className="space-y-2">
            <Label>Safety Score</Label>
            <Input
              type="number"
              value={safetyScore}
              onChange={(event) => setSafetyScore(event.target.value)}
              placeholder="95"
            />
          </div>

          <Button className="w-full" onClick={handleSave}>
            Save Driver
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
