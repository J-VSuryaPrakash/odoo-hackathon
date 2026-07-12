import { useState } from "react"
import { useNavigate } from "react-router-dom"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Checkbox } from "@/components/ui/checkbox"

import { login } from "@/services/AuthService"
import { setAuth } from "@/lib/auth"

import type { UserRole } from "@/types/auth"

export default function LoginPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("manager@transitops.com")

  const [password, setPassword] = useState("password")

  const [role, setRole] = useState<UserRole>("FLEET_MANAGER")

  async function handleLogin() {
    const response = await login({
      email,
      password,
      role,
    })

    setAuth(response.token, response.user.role)

    navigate("/")
  }

  return (
    <div className="grid min-h-screen">
      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>

            <CardDescription>Access your TransitOps dashboard</CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label>Email</Label>

              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>

              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Role</Label>

              <Select
                value={role}
                onValueChange={(value) => setRole(value as UserRole)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="FLEET_MANAGER">Fleet Manager</SelectItem>

                  <SelectItem value="DRIVER">Driver</SelectItem>

                  <SelectItem value="SAFETY_OFFICER">Safety Officer</SelectItem>

                  <SelectItem value="FINANCIAL_ANALYST">
                    Financial Analyst
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox />
                <span className="text-sm">Remember Me</span>
              </div>

              <button className="text-sm text-primary">Forgot Password?</button>
            </div>

            <Button className="w-full" onClick={handleLogin}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
