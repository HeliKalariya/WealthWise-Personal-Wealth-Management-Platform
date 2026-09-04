import { useState } from "react";
import { Lock, Smartphone, Key, Mail, Bell, Shield } from "lucide-react";

export default function SecuritySettings() {
  const [twoFA, setTwoFA] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("30");

  const securityItems = [
    {
      title: "Two-Factor Authentication",
      description: "Add an extra layer of security to your account",
      icon: Shield,
      enabled: twoFA,
      onToggle: () => setTwoFA(!twoFA),
      action: "Manage",
      status: twoFA ? "Enabled" : "Disabled",
    },
    {
      title: "Login Alerts",
      description: "Get notified when someone logs into your account",
      icon: Bell,
      enabled: loginAlerts,
      onToggle: () => setLoginAlerts(!loginAlerts),
      action: "Manage",
      status: loginAlerts ? "On" : "Off",
    },
  ];

  const securityActions = [
    {
      title: "Change Password",
      description: "Update your account password",
      icon: Lock,
      action: "Change",
    },
    {
      title: "Passkeys",
      description: "Use Face ID, Touch ID, or device PIN to sign in",
      icon: Key,
      action: "Set Up",
    },
    {
      title: "Phone Number",
      description: "Verify your phone for account recovery",
      icon: Smartphone,
      action: "Verify",
    },
    {
      title: "Backup Email",
      description: "Add a recovery email address",
      icon: Mail,
      action: "Add",
    },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Security</h2>

      {/* Toggle Items */}
      <div className="space-y-4 mb-8">
        {securityItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Icon size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">{item.status}</span>
                <button
                  onClick={item.onToggle}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    item.enabled ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      item.enabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  {item.action}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t my-6" />

      {/* Action Items */}
      <div className="space-y-4">
        {securityActions.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Icon size={20} className="text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                {item.action}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}