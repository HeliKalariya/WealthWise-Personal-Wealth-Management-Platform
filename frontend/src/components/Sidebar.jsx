import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { X, LayoutDashboard, TrendingUp, TrendingDown, Wallet, Target, User, LogOut, ChartNoAxesCombined } from "lucide-react";

const menu = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Income", icon: TrendingUp, path: "/income" },
  { name: "Expenses", icon: TrendingDown, path: "/expenses" },
  { name: "Budgets", icon: Wallet, path: "/budgets" },
  { name: "Goals", icon: Target, path: "/goals" },
  { name: "Profile", icon: User, path: "/profile" },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  /** End the current browser session and open the login page. */
  const logout = () => { signOut(); navigate("/login"); };
  return (
    <>
      {/* Mobile Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      <aside
        className={`fixed top-0 left-0 z-50 flex h-screen w-72 flex-col justify-between border-r bg-white transition-transform duration-300
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }
        lg:translate-x-0`}
      >
        {/* Logo */}
        <div>
          <div className="flex items-center justify-between border-b p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-indigo-500 text-white"><ChartNoAxesCombined size={24} strokeWidth={2.5} /></span>
              <div className="leading-tight"><h1 className="text-lg font-bold text-slate-950">Wealth</h1><p className="text-xs font-semibold tracking-wide text-slate-500">MANAGEMENT</p></div>
            </div>

            <button
              className="lg:hidden"
              onClick={() => setIsOpen(false)}
            >
              <X />
            </button>
          </div>

          <nav className="space-y-2 p-4">
            {menu.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    }`
                  }
                >
                  <Icon size={20} />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="border-t p-4">
          <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-600 hover:bg-gray-100">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
