import { Badge } from "@/components/ui/badge"
import { type TripStatus } from "@/types/Trips"

interface Props {
  status: TripStatus
}

export function TripStatusBadge({ status }: Props) {
  switch (status) {
    case "DRAFT":
      return <Badge variant="secondary">Draft</Badge>

    case "DISPATCHED":
      return <Badge className="bg-blue-500 hover:bg-blue-500">Dispatched</Badge>

    case "COMPLETED":
      return (
        <Badge className="bg-green-500 hover:bg-green-500">Completed</Badge>
      )

    case "CANCELLED":
      return <Badge variant="destructive">Cancelled</Badge>

    default:
      return <Badge>{status}</Badge>
  }
}
