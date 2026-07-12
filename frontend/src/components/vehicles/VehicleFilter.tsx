import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Props {
  search: string
  onSearchChange: (value: string) => void

  type: string
  onTypeChange: (value: string) => void

  status: string
  onStatusChange: (value: string) => void
}

export function VehicleFilters({
  search,
  onSearchChange,
  type,
  onTypeChange,
  status,
  onStatusChange,
}: Props) {
  return (
    <div className="flex flex-wrap gap-4">
      <Input
        placeholder="Search vehicles..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-sm"
      />

      <Select value={type} onValueChange={onTypeChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Vehicle Type" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">All Types</SelectItem>

          <SelectItem value="Van">Van</SelectItem>

          <SelectItem value="Truck">Truck</SelectItem>

          <SelectItem value="Mini Truck">Mini Truck</SelectItem>
        </SelectContent>
      </Select>

      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">All Status</SelectItem>

          <SelectItem value="AVAILABLE">Available</SelectItem>

          <SelectItem value="ON_TRIP">On Trip</SelectItem>

          <SelectItem value="IN_SHOP">In Shop</SelectItem>

          <SelectItem value="RETIRED">Retired</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
