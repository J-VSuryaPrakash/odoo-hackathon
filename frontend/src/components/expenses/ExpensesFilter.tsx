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
}

export function ExpenseFilters({
  search,
  onSearchChange,
  type,
  onTypeChange,
}: Props) {
  return (
    <div className="flex flex-wrap gap-4">
      <Input
        placeholder="Search expenses..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-sm"
      />

      <Select value={type} onValueChange={onTypeChange}>
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Type" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">All Types</SelectItem>

          <SelectItem value="FUEL">Fuel</SelectItem>

          <SelectItem value="MAINTENANCE">Maintenance</SelectItem>

          <SelectItem value="TOLL">Toll</SelectItem>

          <SelectItem value="INSURANCE">Insurance</SelectItem>

          <SelectItem value="OTHER">Other</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
