import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ChartNoAxesCombined, LockKeyhole, Mail, UserRound } from "lucide-react";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Show the Login or Register form with beginner-friendly validation messages. */
export default function Auth({ register = false }) {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  if (user) return <Navigate to="/" replace />;

  /** Change one form value and clear an old validation message. */
  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  };

  /** Validate the visible form fields before calling the backend API. */
  const validateForm = () => {
    if (register && form.name.trim().length < 2) return "Enter a name with at least 2 characters.";
    if (!emailPattern.test(form.email.trim())) return "Enter a valid email address.";
    if (form.password.length < 6) return "Password must contain at least 6 characters.";
    if (register && form.password !== form.confirmPassword) return "Password and confirm password must match.";
    return "";
  };

  /** Send valid login or registration details to the correct API endpoint. */
  const submit = async (event) => {
    event.preventDefault();
    const validationError = validateForm();
    if (validationError) return setError(validationError);

    setSaving(true);
    try {
      const body = register
        ? { name: form.name.trim(), email: form.email.trim(), password: form.password }
        : { email: form.email.trim(), password: form.password };
      const data = await api(register ? "/auth/register" : "/auth/login", { method: "POST", body: JSON.stringify(body) });
      signIn(data);
      navigate("/");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  return <main className="grid min-h-screen place-items-center bg-slate-50 p-4">
    <form onSubmit={submit} noValidate className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/70">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-indigo-500 text-white"><ChartNoAxesCombined size={30} /></div>
      <h1 className="mt-6 text-center text-3xl font-bold text-slate-950">{register ? "Create account" : "Welcome back"}</h1>
      <p className="mt-2 text-center text-slate-500">{register ? "Start managing your money today." : "Sign in to Wealth Management."}</p>
      <div className="mt-7 grid gap-4">
        {register && <label className="grid gap-2 font-medium text-slate-800">Full name<div className="relative"><UserRound className="absolute left-3 top-3 text-slate-400" size={19} /><input required minLength="2" placeholder="Alex Morgan" value={form.name} onChange={(event) => update("name", event.target.value)} className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 outline-none focus:border-blue-500" /></div></label>}
        <label className="grid gap-2 font-medium text-slate-800">Email<div className="relative"><Mail className="absolute left-3 top-3 text-slate-400" size={19} /><input required type="email" placeholder="you@example.com" value={form.email} onChange={(event) => update("email", event.target.value)} className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 outline-none focus:border-blue-500" /></div></label>
        <label className="grid gap-2 font-medium text-slate-800">Password<div className="relative"><LockKeyhole className="absolute left-3 top-3 text-slate-400" size={19} /><input required minLength="6" type="password" placeholder="Minimum 6 characters" value={form.password} onChange={(event) => update("password", event.target.value)} className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 outline-none focus:border-blue-500" /></div></label>
        {register && <label className="grid gap-2 font-medium text-slate-800">Confirm password<div className="relative"><LockKeyhole className="absolute left-3 top-3 text-slate-400" size={19} /><input required minLength="6" type="password" placeholder="Re-enter your password" value={form.confirmPassword} onChange={(event) => update("confirmPassword", event.target.value)} className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 outline-none focus:border-blue-500" /></div></label>}
      </div>
      {!register && <p className="mt-3 text-right text-sm"><Link className="font-semibold text-blue-600 hover:text-blue-700" to="/forgot-password">Forgot password?</Link></p>}
      {error && <p className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600">{error}</p>}
      <button disabled={saving} className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60">{saving ? "Please wait…" : register ? "Create account" : "Login"}</button>
      <p className="mt-5 text-center text-sm text-slate-500">{register ? "Already have an account?" : "New to WealthWise?"} <Link className="font-semibold text-blue-600" to={register ? "/login" : "/register"}>{register ? "Login" : "Create an account"}</Link></p>
    </form>
  </main>;
}
