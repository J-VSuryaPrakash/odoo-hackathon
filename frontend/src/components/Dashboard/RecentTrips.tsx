import { Card, CardContent } from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { TripStatusBadge } from "@/components/Trips/TripStatusBadge"
import { type Trip } from "@/types/Trips"

interface RecentTripsProps {
  trips: Trip[]
}

export function RecentTrips({ trips }: RecentTripsProps) {
  return (
    <>
      <h1 className="pb-2 text-2xl font-bold">Recent Trips</h1>
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Trip</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Route</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {trips.length > 0 ? (
                trips.map((trip) => (
                  <TableRow key={trip.id}>
                    <TableCell>{trip.id}</TableCell>

                    <TableCell>{trip.vehicleName}</TableCell>

                    <TableCell>{trip.driverName}</TableCell>

                    <TableCell>
                      <TripStatusBadge status={trip.status} />
                    </TableCell>

                    <TableCell>
                      {trip.origin} to {trip.destination}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-8 text-center text-sm text-muted-foreground"
                  >
                    No trips available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
