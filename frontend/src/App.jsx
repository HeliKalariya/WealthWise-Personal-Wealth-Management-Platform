import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Auth from "./pages/Auth";
import { useAuth } from "./context/AuthContext";

import Dashboard from "./pages/Dashboard";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import Goals from "./pages/Goals";
import Budgets from "./pages/Budgets";
import Profile from "./pages/Profile";

/** Block dashboard pages until a user has logged in. */
function ProtectedLayout() {
  const { user, loading } = useAuth();
  if (loading) return <div className="grid min-h-screen place-items-center text-slate-500">Loading WealthWise…</div>;
  return user ? <DashboardLayout /> : <Navigate to="/login" replace />;
}

/** Define public authentication pages and private application pages. */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth register />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
