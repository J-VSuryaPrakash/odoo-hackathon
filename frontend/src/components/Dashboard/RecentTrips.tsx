import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Badge } from "@/components/ui/badge"

const trips = [
  {
    id: "TR001",
    vehicle: "VAN-05",
    driver: "Alex",
    status: "On Trip",
    eta: "45 min",
  },
  {
    id: "TR002",
    vehicle: "TRK-12",
    driver: "John",
    status: "Completed",
    eta: "-",
  },
  {
    id: "TR003",
    vehicle: "MINI-08",
    driver: "Priya",
    status: "Dispatched",
    eta: "1h 10m",
  },
]

export function RecentTrips() {
  return (
    <>
      <h1 className="text-2xl font-bold pb-2">Recent Trips</h1>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Trip</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>ETA</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {trips.map((trip) => (
                <TableRow key={trip.id}>
                  <TableCell>{trip.id}</TableCell>

                  <TableCell>{trip.vehicle}</TableCell>

                  <TableCell>{trip.driver}</TableCell>

                  <TableCell>
                    <Badge>{trip.status}</Badge>
                  </TableCell>

                  <TableCell>{trip.eta}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
