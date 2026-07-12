// src/components/vehicles/status-badge.tsx

import { Badge } from "@/components/ui/badge"

interface Props {
  status: string
}

export function StatusBadge({ status }: Props) {
  switch (status) {
    case "AVAILABLE":
      return <Badge className="bg-green-500">Available</Badge>

    case "ON_TRIP":
      return <Badge className="bg-blue-500">On Trip</Badge>

    case "IN_SHOP":
      return <Badge className="bg-orange-500">In Shop</Badge>

    case "RETIRED":
      return <Badge variant="destructive">Retired</Badge>

    default:
      return <Badge>{status}</Badge>
  }
}
