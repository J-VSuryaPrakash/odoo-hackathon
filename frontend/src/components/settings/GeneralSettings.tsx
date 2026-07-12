import { useState } from "react"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import { toast } from "sonner"

export function GeneralSettings() {
  const [depotName, setDepotName] = useState("Gandhinagar Depot GJ4")

  const [currency, setCurrency] = useState("INR (₹)")

  const [distanceUnit, setDistanceUnit] = useState("Kilometers")

  function handleSave() {
    toast.success("Settings saved successfully")
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">General</h2>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm text-muted-foreground">
            Depot Name
          </label>

          <Input
            value={depotName}
            onChange={(e) => setDepotName(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-muted-foreground">
            Currency
          </label>

          <Input
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-muted-foreground">
            Distance Unit
          </label>

          <Input
            value={distanceUnit}
            onChange={(e) => setDistanceUnit(e.target.value)}
          />
        </div>

        <Button>Save Changes</Button>
      </div>
    </div>
  )
}
