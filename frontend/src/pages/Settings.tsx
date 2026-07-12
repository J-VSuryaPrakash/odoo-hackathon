import { GeneralSettings } from "@/components/settings/GeneralSettings"

import { RBACMatrix } from "@/components/settings/RBACMatrix"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>

        <p className="text-muted-foreground">
          Configure depot preferences and role permissions
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border p-6">
          <GeneralSettings />
        </div>

        <div className="rounded-lg border p-6">
          <RBACMatrix />
        </div>
      </div>
    </div>
  )
}
