# TransitOps — Source of Truth
**Smart Transport Operations Platform — 8-Hour Hackathon Build Spec**

This document is the single reference for what to build, in what order, and how each feature must behave. Use it to brief AI coding agents (give them one section at a time) and to check your own progress.

---

## 1. Elevator Pitch

A centralized web app replacing spreadsheets/logbooks for transport companies: manage vehicles, drivers, trips, maintenance, fuel/expenses, and see fleet KPIs — all with strict status-transition rules enforced server-side.

**4 roles:** Fleet Manager, Driver, Safety Officer, Financial Analyst (RBAC).

---

## 2. Recommended Stack (matches typical MERN/TS background)

| Layer | Choice | Notes |
|---|---|---|
| Frontend | React + TypeScript + Vite | Tailwind for speed |
| Backend | Node.js + Express (or Fastify) + TypeScript | REST API |
| DB | PostgreSQL | Relational integrity for status rules |
| ORM | Prisma | Fast schema iteration |
| Auth | JWT (access token) + bcrypt | Middleware-based RBAC |
| Charts | Recharts | Dashboard + reports |
| Validation | Zod | Shared schema on client/server |

Given 8 hours, **do not** build a separate microservice architecture — one monorepo, one Express app, one React app.

---

## 3. Time-Boxed Build Plan (8 hours)

| Hrs | Phase | Deliverable |
|---|---|---|
| 0–0.5 | Setup | Repo, Prisma schema, DB migration, seed script |
| 0.5–1.5 | Auth + RBAC | Login, JWT middleware, role guard |
| 1.5–3 | Vehicles + Drivers CRUD | Registry pages + APIs, status enums enforced |
| 3–5 | Trip Management | Create/dispatch/complete/cancel + all validation rules |
| 5–6 | Maintenance + Fuel/Expense | Auto status side-effects, cost aggregation |
| 6–7 | Dashboard + Reports | KPIs, filters, CSV export |
| 7–8 | Polish + bonus | Charts, dark mode, license-expiry warnings, PDF export |

**If time runs short, cut in this order (last cut first):** PDF export → dark mode → email reminders → document management → charts → search/sort/filter polish. Never cut: auth, status rules, trip validations.

---

## 4. Data Model (Prisma-style)

```prisma
enum Role {
  FLEET_MANAGER
  DRIVER
  SAFETY_OFFICER
  FINANCIAL_ANALYST
}

enum VehicleStatus {
  AVAILABLE
  ON_TRIP
  IN_SHOP
  RETIRED
}

enum DriverStatus {
  AVAILABLE
  ON_TRIP
  OFF_DUTY
  SUSPENDED
}

enum TripStatus {
  DRAFT
  DISPATCHED
  COMPLETED
  CANCELLED
}

model User {
  id           String   @id @default(uuid())
  email        String   @unique
  passwordHash String
  role         Role
  createdAt    DateTime @default(now())
}

model Vehicle {
  id               String        @id @default(uuid())
  registrationNo   String        @unique
  name             String
  type             String
  maxLoadCapacity  Float         // kg
  odometer         Float         @default(0)
  acquisitionCost  Float
  status           VehicleStatus @default(AVAILABLE)
  region           String?
  trips            Trip[]
  maintenanceLogs  MaintenanceLog[]
  fuelLogs         FuelLog[]
  expenses         Expense[]
}

model Driver {
  id               String       @id @default(uuid())
  name             String
  licenseNumber    String       @unique
  licenseCategory  String
  licenseExpiry    DateTime
  contactNumber    String
  safetyScore      Float        @default(100)
  status           DriverStatus @default(AVAILABLE)
  trips            Trip[]
}

model Trip {
  id              String     @id @default(uuid())
  source          String
  destination     String
  vehicleId       String
  driverId        String
  vehicle         Vehicle    @relation(fields: [vehicleId], references: [id])
  driver          Driver     @relation(fields: [driverId], references: [id])
  cargoWeight     Float
  plannedDistance Float
  actualDistance  Float?
  fuelConsumed    Float?
  status          TripStatus @default(DRAFT)
  createdAt       DateTime   @default(now())
  dispatchedAt    DateTime?
  completedAt     DateTime?
  cancelledAt     DateTime?
}

model MaintenanceLog {
  id          String    @id @default(uuid())
  vehicleId   String
  vehicle     Vehicle   @relation(fields: [vehicleId], references: [id])
  description String
  cost        Float
  isActive    Boolean   @default(true) // false = closed
  createdAt   DateTime  @default(now())
  closedAt    DateTime?
}

model FuelLog {
  id        String   @id @default(uuid())
  vehicleId String
  vehicle   Vehicle  @relation(fields: [vehicleId], references: [id])
  liters    Float
  cost      Float
  date      DateTime @default(now())
}

model Expense {
  id        String   @id @default(uuid())
  vehicleId String
  vehicle   Vehicle  @relation(fields: [vehicleId], references: [id])
  type      String   // e.g. "toll", "other"
  amount    Float
  date      DateTime @default(now())
}
```

---

## 5. State Machines (must be enforced server-side, not just UI)

### Vehicle
```
AVAILABLE → ON_TRIP        (trip dispatched)
ON_TRIP → AVAILABLE        (trip completed OR dispatched trip cancelled)
AVAILABLE → IN_SHOP        (maintenance record created, isActive=true)
IN_SHOP → AVAILABLE        (maintenance closed, UNLESS status is RETIRED)
any → RETIRED              (manual, Fleet Manager only; terminal-ish, excluded from dispatch pool)
```

### Driver
```
AVAILABLE → ON_TRIP        (trip dispatched)
ON_TRIP → AVAILABLE        (trip completed OR dispatched trip cancelled)
* → SUSPENDED / OFF_DUTY   (manual, Safety Officer / Fleet Manager)
```

### Trip
```
DRAFT → DISPATCHED → COMPLETED
DISPATCHED → CANCELLED
```
- DRAFT and COMPLETED/CANCELLED trips do **not** lock the vehicle/driver.
- Only the DISPATCHED transition locks resources.

---

## 6. Mandatory Business Rules (validation checklist)

Implement these as backend validators — treat each as a required unit test.

1. `registrationNo` unique — DB constraint + friendly 409 error.
2. Dispatch pool query MUST exclude vehicles with status `RETIRED` or `IN_SHOP`.
3. Dispatch pool query MUST exclude drivers with status `SUSPENDED`, OR `licenseExpiry < now()`.
4. Vehicle/driver already `ON_TRIP` cannot be selected for a new trip (enforced by rule 2/3's pool + a re-check at dispatch time to prevent race conditions).
5. `cargoWeight <= vehicle.maxLoadCapacity` — reject trip creation otherwise.
6. On dispatch: set `vehicle.status = ON_TRIP`, `driver.status = ON_TRIP`, `trip.status = DISPATCHED`, `dispatchedAt = now()`. Do this in a single DB transaction.
7. On complete: set `vehicle.status = AVAILABLE`, `driver.status = AVAILABLE`, `trip.status = COMPLETED`, store `actualDistance`/`fuelConsumed`, update `vehicle.odometer += actualDistance`. Transaction.
8. On cancel (only valid from DISPATCHED): restore vehicle/driver to `AVAILABLE`, `trip.status = CANCELLED`. Transaction.
9. Creating an active `MaintenanceLog` → `vehicle.status = IN_SHOP` immediately (transaction).
10. Closing a `MaintenanceLog` (`isActive: false`) → `vehicle.status = AVAILABLE` **unless** vehicle was manually `RETIRED`.

> Wrap rules 6–10 in DB transactions (`prisma.$transaction`) so status + trip/log updates never desync.

---

## 7. RBAC Matrix

| Action | Fleet Manager | Driver | Safety Officer | Financial Analyst |
|---|---|---|---|---|
| CRUD Vehicles | ✅ | ❌ (read-only) | ❌ (read-only) | ❌ (read-only) |
| CRUD Drivers | ✅ | ❌ (read-only) | ✅ (status/safety score) | ❌ (read-only) |
| Create/Dispatch/Complete Trip | ✅ | ✅ | ❌ (read-only) | ❌ (read-only) |
| Maintenance Logs | ✅ | ❌ | ❌ (read-only) | ❌ (read-only) |
| Fuel/Expense entry | ✅ | ✅ | ❌ | ❌ (read-only) |
| Dashboard/Reports | ✅ | ✅ (limited) | ✅ (compliance view) | ✅ (full financial) |

Implement as an Express middleware: `requireRole(['FLEET_MANAGER', ...])` per route.

---

## 8. API Endpoints (suggested)

```
POST   /api/auth/login
GET    /api/auth/me

GET    /api/vehicles            ?status=&type=&region=
POST   /api/vehicles
GET    /api/vehicles/:id
PATCH  /api/vehicles/:id
DELETE /api/vehicles/:id

GET    /api/drivers             ?status=
POST   /api/drivers
PATCH  /api/drivers/:id

GET    /api/trips               ?status=
POST   /api/trips               (creates DRAFT)
POST   /api/trips/:id/dispatch
POST   /api/trips/:id/complete
POST   /api/trips/:id/cancel

POST   /api/maintenance
POST   /api/maintenance/:id/close

POST   /api/fuel-logs
POST   /api/expenses

GET    /api/dashboard/kpis      ?type=&status=&region=
GET    /api/reports/fleet       (fuel efficiency, utilization, cost, ROI)
GET    /api/reports/export.csv
```

---

## 9. Dashboard KPIs (formulas)

| KPI | Formula |
|---|---|
| Active Vehicles | count where status != RETIRED |
| Available Vehicles | count where status = AVAILABLE |
| Vehicles in Maintenance | count where status = IN_SHOP |
| Active Trips | count where status = DISPATCHED |
| Pending Trips | count where status = DRAFT |
| Drivers On Duty | count where status = ON_TRIP |
| Fleet Utilization % | `(vehicles ON_TRIP / active vehicles) * 100` |

Filters: vehicle type, status, region — apply as query params on all the above.

---

## 10. Reports & Analytics (formulas)

| Metric | Formula |
|---|---|
| Fuel Efficiency | `totalDistance / totalFuelLiters` (per vehicle) |
| Operational Cost | `SUM(fuelLog.cost) + SUM(maintenanceLog.cost) + SUM(expense.amount)` per vehicle |
| Vehicle ROI | `(Revenue - (Maintenance + Fuel)) / AcquisitionCost` — Revenue = sum of trip revenue if tracked, otherwise define a placeholder revenue field/rate-per-km for the demo |
| Fleet Utilization | see KPI table above, can also be reported over a date range |

CSV export: flatten per-vehicle report rows → `vehicleId, reg, efficiency, opCost, roi, utilization`. PDF export is optional (cut first if short on time).

---

## 11. Example End-to-End Flow (use as your demo script / E2E test)

1. Register vehicle `Van-05`, maxLoad 500kg → status `AVAILABLE`.
2. Register driver `Alex`, valid license → status `AVAILABLE`.
3. Create trip, cargoWeight 450kg → validated `450 ≤ 500` → trip `DRAFT`.
4. Dispatch trip → vehicle & driver → `ON_TRIP`, trip → `DISPATCHED`.
5. Complete trip (enter final odometer + fuel consumed) → vehicle & driver → `AVAILABLE`, trip → `COMPLETED`, odometer updated.
6. Create maintenance record (Oil Change) → vehicle → `IN_SHOP`, hidden from dispatch pool.
7. Reports reflect updated operational cost + fuel efficiency.

Build this exact flow as your Postman collection / seed script — it doubles as your live demo.

---

## 12. Mandatory Deliverables Checklist

- [ ] Responsive web UI
- [ ] Auth + RBAC (4 roles enforced server-side)
- [ ] Vehicle CRUD
- [ ] Driver CRUD
- [ ] Trip management with all validations (§6)
- [ ] Automatic status transitions (§5) via DB transactions
- [ ] Maintenance workflow (auto IN_SHOP / restore)
- [ ] Fuel & expense tracking + auto cost totals
- [ ] Dashboard with KPIs + filters
- [ ] Charts/visual analytics
- [ ] CSV export

## 13. Bonus (only after checklist above is 100% done)

- [ ] PDF export
- [ ] Email reminders for expiring licenses
- [ ] Vehicle document management (upload/store docs)
- [ ] Advanced search/filter/sort
- [ ] Dark mode

---

## 14. Seed Data Suggestion

Seed 5–8 vehicles (mixed statuses, at least one RETIRED and one IN_SHOP), 5–8 drivers (include one SUSPENDED and one with expired license to prove rule enforcement), and 5–10 trips across all statuses. This lets you demo every validation rule without manual setup during judging.

---

## 15. Reference

- Mockup: https://link.excalidraw.com/l/65VNwvy7c4X/1FHGDNgD2td
- Entities: Users, Roles, Vehicles, Drivers, Trips, Maintenance Logs, Fuel Logs, Expenses
