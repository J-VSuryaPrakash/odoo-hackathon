import { Navigate } from "react-router-dom"

import { getRole } from "@/lib/auth"

interface Props {
  allowedRoles: string[]
  children: React.ReactNode
}

export default function RoleGuard({ allowedRoles, children }: Props) {
  const role = getRole()

  if (!role) {
    return <Navigate to="/login" replace />
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
