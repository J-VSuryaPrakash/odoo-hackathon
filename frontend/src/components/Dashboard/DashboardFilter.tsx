import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function DashboardFilters() {
  return (
    <div>
      <h2 className="text-lg font-semibold pb-1">Filters</h2>
      <div className="flex flex-wrap gap-4 p-2">
      <Select>
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Vehicle Type" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Region" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All</SelectItem>
        </SelectContent>
      </Select>
          </div>
    </div>
  )
}
