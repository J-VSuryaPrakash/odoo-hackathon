import type { UserRole } from "@/types/auth"

const TOKEN_KEY = "transitops_token"
const ROLE_KEY = "transitops_role"

export function setAuth(token: string, role: UserRole) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(ROLE_KEY, role)
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function getRole() {
  return localStorage.getItem(ROLE_KEY)
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(ROLE_KEY)
}
