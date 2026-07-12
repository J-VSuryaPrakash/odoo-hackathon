import type { UserRole } from "@/types/auth"

const TOKEN_KEY = "transitops_token"
const ROLE_KEY = "transitops_role"
const USER_KEY = "transitops_user"

export function setAuth(token: string, role: UserRole, user: string) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(ROLE_KEY, role)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function getRole() {
  return localStorage.getItem(ROLE_KEY)
}

export function getUser() {
  const user = localStorage.getItem(USER_KEY)

  return user ? JSON.parse(user) : null
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(ROLE_KEY)
  localStorage.removeItem(USER_KEY)
}
