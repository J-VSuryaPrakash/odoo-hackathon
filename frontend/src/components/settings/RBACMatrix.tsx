import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"

const roles = [
  {
    role: "Fleet Manager",

    fleet: "✓",
    drivers: "✓",
    trips: "✓",
    expenses: "✓",
    analytics: "✓",
  },

  {
    role: "Dispatcher",

    fleet: "View",
    drivers: "-",
    trips: "✓",
    expenses: "-",
    analytics: "-",
  },

  {
    role: "Safety Officer",

    fleet: "-",
    drivers: "✓",
    trips: "View",
    expenses: "-",
    analytics: "-",
  },

  {
    role: "Financial Analyst",

    fleet: "View",
    drivers: "-",
    trips: "-",
    expenses: "✓",
    analytics: "✓",
  },
]

export function RBACMatrix() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        Role-Based Access Control (RBAC)
      </h2>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>

              <TableHead>Fleet</TableHead>

              <TableHead>Drivers</TableHead>

              <TableHead>Trips</TableHead>

              <TableHead>Fuel/Exp.</TableHead>

              <TableHead>Analytics</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.role}>
                <TableCell>{role.role}</TableCell>

                <TableCell>{role.fleet}</TableCell>

                <TableCell>{role.drivers}</TableCell>

                <TableCell>{role.trips}</TableCell>

                <TableCell>{role.expenses}</TableCell>

                <TableCell>{role.analytics}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
