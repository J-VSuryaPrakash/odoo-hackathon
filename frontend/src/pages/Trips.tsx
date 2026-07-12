import { useMemo, useState } from "react"
import { trips as initialTrips } from "@/data/TripsData"
import { TripFilters } from "@/components/Trips/TripFilter"
import { TripTable } from "@/components/Trips/TripTable"
import { useFleet } from "@/context/FleetContext";
import { AddTripDialog } from "@/components/Trips/TripDailog";

function TripsPage() {

  const { trips, setTrips, dispatchTrip, completeTrip, cancelTrip } = useFleet()
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("ALL")


  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => {
      const matchesSearch =
        trip.id.toLowerCase().includes(search.toLowerCase()) ||
        trip.driverName.toLowerCase().includes(search.toLowerCase()) ||
        trip.vehicleName.toLowerCase().includes(search.toLowerCase())

      const matchesStatus = status === "ALL" || trip.status === status

      return matchesSearch && matchesStatus
    })
  }, [trips, search, status])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Trips</h1>

          <p className="text-muted-foreground">
            Manage trip dispatch operations
          </p>
        </div>

        <AddTripDialog />
      </div>

      <TripFilters
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
      />

      <TripTable
        trips={filteredTrips}
        onDispatch={dispatchTrip}
        onComplete={completeTrip}
        onCancel={cancelTrip}
      />
    </div>
  )
}

export default TripsPage
