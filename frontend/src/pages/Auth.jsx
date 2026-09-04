import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ChartNoAxesCombined, LockKeyhole, Mail, UserRound } from "lucide-react";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";

/** Render the small login and registration forms used by this project. */
export default function Auth({ register = false }) {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  if (user) return <Navigate to="/" replace />;

  /** Submit user credentials to the matching login or register API endpoint. */
  const submit = async (event) => {
    event.preventDefault(); setError(""); setSaving(true);
    try { const data = await api(register ? "/auth/register" : "/auth/login", { method: "POST", body: JSON.stringify(register ? form : { email: form.email, password: form.password }) }); signIn(data); navigate("/"); } catch (requestError) { setError(requestError.message); } finally { setSaving(false); }
  };

  /** Update one field in the authentication form. */
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  return <main className="grid min-h-screen place-items-center bg-slate-50 p-4"><form onSubmit={submit} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/70"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-indigo-500 text-white"><ChartNoAxesCombined size={30} /></div><h1 className="mt-6 text-center text-3xl font-bold text-slate-950">{register ? "Create account" : "Welcome back"}</h1><p className="mt-2 text-center text-slate-500">{register ? "Start managing your money today." : "Sign in to Wealth Management."}</p><div className="mt-7 grid gap-4">{register && <label className="grid gap-2 font-medium text-slate-800">Full name<div className="relative"><UserRound className="absolute left-3 top-3 text-slate-400" size={19} /><input required value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 outline-none focus:border-blue-500" /></div></label>}<label className="grid gap-2 font-medium text-slate-800">Email<div className="relative"><Mail className="absolute left-3 top-3 text-slate-400" size={19} /><input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 outline-none focus:border-blue-500" /></div></label><label className="grid gap-2 font-medium text-slate-800">Password<div className="relative"><LockKeyhole className="absolute left-3 top-3 text-slate-400" size={19} /><input required minLength="6" type="password" value={form.password} onChange={(e) => update("password", e.target.value)} className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 outline-none focus:border-blue-500" /></div></label></div>{error && <p className="mt-4 text-sm font-medium text-rose-500">{error}</p>}<button disabled={saving} className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60">{saving ? "Please wait…" : register ? "Create account" : "Login"}</button><p className="mt-5 text-center text-sm text-slate-500">{register ? "Already have an account?" : "New to WealthWise?"} <Link className="font-semibold text-blue-600" to={register ? "/login" : "/register"}>{register ? "Login" : "Create an account"}</Link></p></form></main>;
}
