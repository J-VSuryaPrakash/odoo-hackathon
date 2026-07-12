import { Badge } from "@/components/ui/badge"

interface Props {
  status: string
}

export function MaintenanceStatusBadge({ status }: Props) {
  if (status === "OPEN") {
    return <Badge className="bg-orange-500 hover:bg-orange-500">Open</Badge>
  }

  return <Badge className="bg-green-500 hover:bg-green-500">Completed</Badge>
}
