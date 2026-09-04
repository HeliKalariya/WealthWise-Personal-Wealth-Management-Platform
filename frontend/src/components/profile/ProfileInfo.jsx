import { Mail, Phone, Calendar, MapPin, Shield, CreditCard, Camera } from "lucide-react";

export default function ProfileInfo() {
  const user = {
    name: "Alex Morgan",
    email: "alex.morgan@email.com",
    phone: "+1 (555) 123-4567",
    dob: "March 15, 1990",
    location: "San Francisco, CA",
    memberSince: "January 2023",
    plan: "Pro",
    currency: "INR",
    timezone: "America/Los_Angeles",
  };

  const infoItems = [
    { label: "Email", value: user.email, icon: Mail },
    { label: "Phone", value: user.phone, icon: Phone },
    { label: "Date of Birth", value: user.dob, icon: Calendar },
    { label: "Location", value: user.location, icon: MapPin },
    { label: "Member Since", value: user.memberSince, icon: Shield },
    { label: "Plan", value: user.plan, icon: CreditCard },
    { label: "Currency", value: user.currency, icon: CreditCard },
    { label: "Timezone", value: user.timezone, icon: Calendar },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      {/* Avatar & Name */}
      <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:justify-start gap-6 mb-8 pb-8 border-b">
        <div className="relative">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white">
            AM
          </div>
          <button className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700 transition shadow-lg">
            <Camera size={18} />
          </button>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
          <p className="text-gray-500">WealthWise Pro Member</p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {infoItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="p-4 rounded-xl bg-gray-50">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Icon size={18} className="text-blue-600" />
                </div>
                <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  {item.label}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-900 ml-11">{item.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
