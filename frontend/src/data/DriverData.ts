import { type Driver } from "@/types/Driver"

export const drivers: Driver[] = [
  {
      id: "1",
    userId: "user1",
    name: "Alex Johnson",
    licenseNumber: "DL123456",
    licenseCategory: "Heavy",
    licenseExpiry: "2028-05-12",
    contactNumber: "9876543210",
    safetyScore: 95,
    status: "AVAILABLE",
  },
  {
    id: "2",
    userId: "user2",
    name: "John Smith",
    licenseNumber: "DL987654",
    licenseCategory: "Light",
    licenseExpiry: "2027-11-20",
    contactNumber: "9123456789",
    safetyScore: 88,
    status: "ON_TRIP",
  },
  {
    id: "3",
    userId: "user3",
    name: "David Kumar",
    licenseNumber: "DL555666",
    licenseCategory: "Heavy",
    licenseExpiry: "2024-02-10",
    contactNumber: "9988776655",
    safetyScore: 72,
    status: "SUSPENDED",
  },
]
