import { Badge } from "@/components/ui/badge"
import { type DriverStatus } from "@/types/Driver"

interface Props {
  status: DriverStatus
}

export function DriverStatusBadge({ status }: Props) {
  switch (status) {
    case "AVAILABLE":
      return (
        <Badge className="bg-green-500 hover:bg-green-500">Available</Badge>
      )

    case "ON_TRIP":
      return <Badge className="bg-blue-500 hover:bg-blue-500">On Trip</Badge>

    case "OFF_DUTY":
      return (
        <Badge className="bg-orange-500 hover:bg-orange-500">Off Duty</Badge>
      )

    case "SUSPENDED":
      return <Badge variant="destructive">Suspended</Badge>

    default:
      return <Badge>{status}</Badge>
  }
}
