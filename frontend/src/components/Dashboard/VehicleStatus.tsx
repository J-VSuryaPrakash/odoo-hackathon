import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Progress } from "@/components/ui/progress"

export function VehicleStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehicle Status</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div>
          <div className="mb-2 flex justify-between">
            <span>Available</span>
            <span>42</span>
          </div>

          <Progress value={80} />
        </div>

        <div>
          <div className="mb-2 flex justify-between">
            <span>On Trip</span>
            <span>18</span>
          </div>

          <Progress value={35} />
        </div>

        <div>
          <div className="mb-2 flex justify-between">
            <span>In Shop</span>
            <span>5</span>
          </div>

          <Progress value={10} />
        </div>

        <div>
          <div className="mb-2 flex justify-between">
            <span>Retired</span>
            <span>2</span>
          </div>

          <Progress value={4} />
        </div>
      </CardContent>
    </Card>
  )
}
