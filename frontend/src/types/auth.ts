// src/types/auth.ts

export type UserRole =
  "FLEET_MANAGER" | "DRIVER" | "SAFETY_OFFICER" | "FINANCIAL_ANALYST"

export interface User {
  id: string
  email: string
  role: UserRole
}

export interface AuthState {
  token: string | null
  user: User | null
}
