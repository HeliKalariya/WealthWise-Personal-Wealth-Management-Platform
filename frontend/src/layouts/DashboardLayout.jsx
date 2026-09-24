import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-full bg-gray-100">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex min-w-0 flex-1 flex-col lg:ml-72">
        <header className="sticky top-0 z-30 flex h-16 items-center border-b border-slate-200 last:border-0 bg-white px-4">
          <button
            onClick={() => setIsOpen(true)}
            className="mr-3 lg:hidden"
          >
            <Menu size={28} />
          </button>

          <div className="flex-1">
            <Header />
          </div>
        </header>

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
