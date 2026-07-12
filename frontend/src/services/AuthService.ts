import type { LoginResponse, UserRole } from "@/types/auth"

interface LoginPayload {
  email: string
  password: string
  role: UserRole
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  return {
    token: "demo-token",
    user: {
      id: crypto.randomUUID(),
      email: payload.email,
      role: payload.role,
    },
  }
}
