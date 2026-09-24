import { useState } from "react";
import { ChartNoAxesCombined, LockKeyhole, Mail } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../api/client";

/** Reuse the project authentication card style for password recovery screens. */
function RecoveryCard({ children, title, subtitle }) {
  return <main className="grid min-h-screen place-items-center bg-slate-50 p-4"><section className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/70"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-indigo-500 text-white"><ChartNoAxesCombined size={30} /></div><h1 className="mt-6 text-center text-3xl font-bold text-slate-950">{title}</h1><p className="mt-2 text-center text-slate-500">{subtitle}</p>{children}</section></main>;
}

/** Request a short-lived reset link using a registered email address. */
export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  /** Ask the backend to email a reset link to the registered account. */
  const submit = async (event) => {
    event.preventDefault(); setError(""); setMessage(""); setSaving(true);
    try { const data = await api("/auth/forgot-password", { method: "POST", body: JSON.stringify({ email }) }); setMessage(data.message); } catch (requestError) { setError(requestError.message); } finally { setSaving(false); }
  };

  return <RecoveryCard title="Forgot password?" subtitle="Enter your email and we will send a reset link."><form onSubmit={submit} className="mt-7"><label className="grid gap-2 font-medium text-slate-800">Email address<div className="relative"><Mail className="absolute left-3 top-3 text-slate-400" size={19} /><input required type="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 outline-none focus:border-blue-500" /></div></label>{error && <p className="mt-4 text-sm font-medium text-rose-500">{error}</p>}{message && <p className="mt-4 text-sm font-medium text-emerald-600">{message}</p>}<button disabled={saving} className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white disabled:opacity-60">{saving ? "Sending email…" : "Send reset link"}</button><p className="mt-5 text-center text-sm text-slate-500"><Link className="font-semibold text-blue-600" to="/login">Back to login</Link></p></form></RecoveryCard>;
}

/** Accept a valid reset token and save a new password for the user. */
export function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const token = params.get("token");

  /** Validate matching passwords and send the reset request to the backend. */
  const submit = async (event) => {
    event.preventDefault(); setError("");
    if (!token) return setError("This reset link is missing its token. Request a new link.");
    if (password !== confirmPassword) return setError("The passwords do not match.");
    setSaving(true);
    try { await api("/auth/reset-password", { method: "POST", body: JSON.stringify({ token, password }) }); navigate("/login", { replace: true, state: { message: "Password reset successfully. Please log in." } }); } catch (requestError) { setError(requestError.message); } finally { setSaving(false); }
  };

  return <RecoveryCard title="Reset password" subtitle="Choose a new password with at least 6 characters."><form onSubmit={submit} className="mt-7 grid gap-4"><label className="grid gap-2 font-medium text-slate-800">New password<div className="relative"><LockKeyhole className="absolute left-3 top-3 text-slate-400" size={19} /><input required minLength="6" type="password" placeholder="Minimum 6 characters" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 outline-none focus:border-blue-500" /></div></label><label className="grid gap-2 font-medium text-slate-800">Confirm new password<div className="relative"><LockKeyhole className="absolute left-3 top-3 text-slate-400" size={19} /><input required minLength="6" type="password" placeholder="Re-enter your password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 outline-none focus:border-blue-500" /></div></label>{error && <p className="text-sm font-medium text-rose-500">{error}</p>}<button disabled={saving} className="mt-2 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white disabled:opacity-60">{saving ? "Saving password…" : "Reset password"}</button><p className="text-center text-sm text-slate-500"><Link className="font-semibold text-blue-600" to="/login">Back to login</Link></p></form></RecoveryCard>;
}
