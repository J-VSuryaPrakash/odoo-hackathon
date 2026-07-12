export type UserRole =
  "FLEET_MANAGER" | "DRIVER" | "SAFETY_OFFICER" | "FINANCIAL_ANALYST"

export interface User {
  id: string
  email: string
  role: UserRole
}

export interface LoginResponse {
  token: string
  user: User
}
