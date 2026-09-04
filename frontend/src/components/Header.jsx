import { Search, Bell, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user } = useAuth();
  const initials = user?.name?.split(" ").map((name) => name[0]).join("").slice(0, 2).toUpperCase() || "WW";
  return (
    <div className="flex h-16 w-full items-center justify-between gap-4">
      {/* Search */}
      <div className="flex-1 max-w-2xl ">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search transactions, goals, assets..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-11 pr-4 text-sm text-gray-700 placeholder:text-gray-400 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Mobile Search Icon */}
      <button className="rounded-full p-2 hover:bg-gray-100 sm:hidden">
        <Search size={20} className="text-gray-600" />
      </button>

      {/* Right Section */}
      <div className="ml-auto flex items-center gap-4">
        {/* Notification */}
        <button className="relative rounded-full p-2 hover:bg-gray-100">
          <Bell size={22} className="text-gray-700" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border border-white bg-red-500"></span>
        </button>

        {/* User */}
        <button className="flex items-center gap-2 rounded-full hover:bg-gray-100 p-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
            {initials}
          </div>

          <ChevronDown
            size={18}
            className="hidden text-gray-500 md:block"
          />
        </button>
      </div>
    </div>
  );
}
