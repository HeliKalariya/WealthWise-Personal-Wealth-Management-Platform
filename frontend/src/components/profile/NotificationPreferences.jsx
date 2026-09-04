import { useState } from "react";
import { Bell, Mail, Smartphone, Calendar, TrendingUp, AlertTriangle } from "lucide-react";

export default function NotificationPreferences() {
  const [notifications, setNotifications] = useState({
    email: {
      budgetAlerts: true,
      goalMilestones: true,
      weeklyReports: true,
      monthlyReports: true,
      securityAlerts: true,
      marketing: false,
    },
    push: {
      budgetAlerts: true,
      goalMilestones: true,
      billReminders: true,
      investmentAlerts: false,
      securityAlerts: true,
    },
    inApp: {
      budgetAlerts: true,
      goalMilestones: true,
      billReminders: true,
      investmentAlerts: true,
      securityAlerts: true,
    },
  });

  const notificationCategories = [
    {
      key: "budgetAlerts",
      label: "Budget Alerts",
      description: "Notify when approaching or exceeding budget limits",
      icon: AlertTriangle,
      channels: ["email", "push", "inApp"],
    },
    {
      key: "goalMilestones",
      label: "Goal Milestones",
      description: "Celebrate when you reach savings or investment goals",
      icon: TrendingUp,
      channels: ["email", "push", "inApp"],
    },
    {
      key: "billReminders",
      label: "Bill Reminders",
      description: "Get reminded before upcoming bills are due",
      icon: Calendar,
      channels: ["push", "inApp"],
    },
    {
      key: "weeklyReports",
      label: "Weekly Reports",
      description: "Receive a weekly summary of your financial activity",
      icon: Calendar,
      channels: ["email"],
    },
    {
      key: "monthlyReports",
      label: "Monthly Reports",
      description: "Receive a comprehensive monthly financial report",
      icon: Calendar,
      channels: ["email"],
    },
    {
      key: "investmentAlerts",
      label: "Investment Alerts",
      description: "Notifications about significant portfolio changes",
      icon: TrendingUp,
      channels: ["push", "inApp"],
    },
    {
      key: "securityAlerts",
      label: "Security Alerts",
      description: "Important security notifications about your account",
      icon: Bell,
      channels: ["email", "push", "inApp"],
    },
    {
      key: "marketing",
      label: "Marketing & Tips",
      description: "Financial tips, product updates, and special offers",
      icon: Mail,
      channels: ["email"],
    },
  ];

  const toggleNotification = (channel, key) => {
    setNotifications((prev) => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [key]: !prev[channel][key],
      },
    }));
  };

  const channelLabels = {
    email: "Email",
    push: "Push",
    inApp: "In-App",
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Notification Preferences</h2>

      {/* Channel Headers */}
      <div className="hidden md:grid grid-cols-4 gap-4 mb-4 px-4">
        <div className="text-center text-sm font-medium text-gray-500">Notification</div>
        <div className="text-center text-sm font-medium text-gray-500">Email</div>
        <div className="text-center text-sm font-medium text-gray-500">Push</div>
        <div className="text-center text-sm font-medium text-gray-500">In-App</div>
      </div>

      <div className="space-y-3">
        {notificationCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Icon size={20} className="text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{category.label}</h3>
                <p className="text-sm text-gray-500 truncate">{category.description}</p>
              </div>
              <div className="hidden md:grid grid-cols-3 gap-4">
                {["email", "push", "inApp"].map((channel) => (
                  <div key={channel} className="flex justify-center">
                    {category.channels.includes(channel) ? (
                      <button
                        onClick={() => toggleNotification(channel, category.key)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          notifications[channel][category.key] ? "bg-blue-600" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            notifications[channel][category.key] ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    ) : (
                      <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-100">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-gray-300 translate-x-1" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* Mobile toggles */}
              <div className="md:hidden flex flex-wrap gap-2 justify-end">
                {["email", "push", "inApp"].map((channel) => (
                  category.channels.includes(channel) && (
                    <div key={channel} className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 capitalize">{channelLabels[channel]}</span>
                      <button
                        onClick={() => toggleNotification(channel, category.key)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                          notifications[channel][category.key] ? "bg-blue-600" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                            notifications[channel][category.key] ? "translate-x-5" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  )
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}