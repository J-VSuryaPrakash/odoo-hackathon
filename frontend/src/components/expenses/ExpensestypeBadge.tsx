import { Badge } from "@/components/ui/badge"

interface Props {
  type: string
}

export function ExpenseTypeBadge({ type }: Props) {
  switch (type) {
    case "FUEL":
      return <Badge>Fuel</Badge>

    case "MAINTENANCE":
      return <Badge>Maintenance</Badge>

    case "TOLL":
      return <Badge>Toll</Badge>

    case "INSURANCE":
      return <Badge>Insurance</Badge>

    default:
      return <Badge>Other</Badge>
  }
}
