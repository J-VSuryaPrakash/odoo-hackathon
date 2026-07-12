import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { type DriverStatus } from "@/types/Driver"

interface DriverStatusSelectProps {
  value: DriverStatus
  onChange: (status: DriverStatus) => void
}

export function DriverStatusSelect({
  value,
  onChange,
}: DriverStatusSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(value) => onChange(value as DriverStatus)}
    >
      <SelectTrigger className="w-[140px]">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="AVAILABLE">Available</SelectItem>

        <SelectItem value="ON_TRIP">On Trip</SelectItem>

        <SelectItem value="OFF_DUTY">Off Duty</SelectItem>

        <SelectItem value="SUSPENDED">Suspended</SelectItem>
      </SelectContent>
    </Select>
  )
}
