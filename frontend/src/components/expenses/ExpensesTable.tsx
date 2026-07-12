import { type Expense } from "@/types/expenses"

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"

interface Props {
  expenses: Expense[]
}

export function ExpenseTable({ expenses }: Props) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Trip</TableHead>

            <TableHead>Vehicle</TableHead>

            <TableHead>Toll</TableHead>

            <TableHead>Other</TableHead>

            <TableHead>Maint. (Linked)</TableHead>

            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {expenses.map((expense) => {
            const total = expense.toll + expense.other + expense.maintenanceCost

            return (
              <TableRow key={expense.id}>
                <TableCell>{expense.tripId}</TableCell>

                <TableCell>{expense.vehicleName}</TableCell>

                <TableCell>₹{expense.toll.toLocaleString()}</TableCell>

                <TableCell>₹{expense.other.toLocaleString()}</TableCell>

                <TableCell>
                  ₹{expense.maintenanceCost.toLocaleString()}
                </TableCell>

                <TableCell className="font-semibold">
                  ₹{total.toLocaleString()}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
