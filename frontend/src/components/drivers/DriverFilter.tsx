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

  status: string
  onStatusChange: (value: string) => void
}

export function DriverFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
}: Props) {
  return (
    <div className="flex flex-wrap gap-4">
      <Input
        placeholder="Search drivers..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-sm"
      />

      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">All Status</SelectItem>

          <SelectItem value="AVAILABLE">Available</SelectItem>

          <SelectItem value="ON_TRIP">On Trip</SelectItem>

          <SelectItem value="OFF_DUTY">Off Duty</SelectItem>

          <SelectItem value="SUSPENDED">Suspended</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
