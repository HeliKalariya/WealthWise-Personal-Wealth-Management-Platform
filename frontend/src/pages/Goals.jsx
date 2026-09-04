import { useEffect, useState } from "react";
import { CalendarDays, Pencil, Plus, Target, Trash2, X } from "lucide-react";
import { api } from "../api/client";

const rupees = (amount) => `₹${new Intl.NumberFormat("en-IN").format(amount)}`;
const emptyForm = { name: "", target: "", current: "", targetDate: "", category: "Savings" };

/** Show the matching centered Create/Edit Financial Goal modal. */
function GoalModal({ goal, close, reload }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  /** Prefill the modal when the user edits an existing goal. */
  useEffect(() => {
    setError("");
    setForm(goal ? { name: goal.name, target: goal.target, current: goal.current, targetDate: new Date(goal.targetDate).toISOString().slice(0, 10), category: goal.category || "Savings" } : emptyForm);
  }, [goal]);

  /** Create a new goal or save edits to the selected goal. */
  const submit = async (event) => {
    event.preventDefault();
    try {
      await api(goal ? `/goals/${goal._id}` : "/goals", { method: goal ? "PATCH" : "POST", body: JSON.stringify({ ...form, target: Number(form.target), current: Number(form.current) }) });
      close(); reload();
    } catch (requestError) { setError(requestError.message); }
  };

  return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/75 p-4">
    <form onSubmit={submit} className="w-full max-w-xl rounded-2xl bg-white p-7 shadow-2xl">
      <div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-slate-900">{goal ? "Edit financial goal" : "Create financial goal"}</h2><button type="button" onClick={close} className="text-slate-500" aria-label="Close"><X size={21} /></button></div>
      <div className="mt-6 grid gap-5">
        <label className="grid gap-2 text-lg font-medium">Goal name<input required placeholder="Down payment, Vacation..." value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" /></label>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-lg font-medium">Target amount<input required type="number" min="1" placeholder="0.00" value={form.target} onChange={(event) => setForm({ ...form, target: event.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500" /></label>
          <label className="grid gap-2 text-lg font-medium">Current savings<input required type="number" min="0" placeholder="0.00" value={form.current} onChange={(event) => setForm({ ...form, current: event.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500" /></label>
        </div>
        <label className="grid gap-2 text-lg font-medium">Deadline<input required type="date" value={form.targetDate} onChange={(event) => setForm({ ...form, targetDate: event.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500" /></label>
      </div>
      {error && <p className="mt-3 text-sm text-rose-500">{error}</p>}
      <div className="mt-6 flex justify-end gap-3"><button type="button" onClick={close} className="rounded-2xl border border-slate-200 px-5 py-3 font-semibold shadow-sm">Cancel</button><button className="rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-600/20">{goal ? "Update goal" : "Save goal"}</button></div>
    </form>
  </div>;
}

/** Ask for confirmation before permanently deleting a financial goal. */
function DeleteModal({ goal, close, confirm }) {
  if (!goal) return null;
  return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/75 p-4"><div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"><h2 className="text-xl font-bold text-slate-900">Delete goal?</h2><p className="mt-3 text-slate-500">Are you sure you want to delete <b>{goal.name}</b>? This action cannot be undone.</p><div className="mt-6 flex justify-end gap-3"><button onClick={close} className="rounded-xl border border-slate-200 px-4 py-2.5 font-semibold">Cancel</button><button onClick={() => confirm(goal._id)} className="rounded-xl bg-rose-500 px-4 py-2.5 font-semibold text-white">Yes, delete</button></div></div></div>;
}

/** Render one goal in the reference-card layout with goal actions. */
function GoalCard({ goal, onEdit, onDelete }) {
  const progress = Math.min(100, Math.round((goal.current / goal.target) * 100));
  const remaining = goal.target - goal.current;
  const deadline = new Date(goal.targetDate).toLocaleDateString("en-US", { month: "short", year: "numeric" });

  return <article className="rounded-2xl bg-white p-6 shadow-[0_5px_16px_rgba(15,23,42,0.05)] sm:p-8">
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
      <div className="grid h-32 w-32 shrink-0 place-items-center rounded-full" style={{ background: `conic-gradient(from -5deg, #2563eb ${progress * 3.6}deg, #f1f5f9 0deg)` }}>
        <div className="grid h-[104px] w-[104px] place-items-center rounded-full bg-white text-center"><div><p className="text-3xl font-bold text-slate-900">{progress}%</p><p className="text-xs text-slate-500">DONE</p></div></div>
      </div>
      <div className="relative min-w-0 flex-1 pr-0 sm:pr-24">
        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600"><Target size={14} /> GOAL</span>
        <div className="mt-3 flex items-center gap-3 sm:absolute sm:right-0 sm:top-0 sm:mt-0">
          <button onClick={() => onEdit(goal)} className="text-slate-700 transition hover:text-blue-600" title="Edit goal" aria-label={`Edit ${goal.name}`}><Pencil size={17} /></button>
          <button onClick={() => onDelete(goal)} className="text-rose-500 transition hover:text-rose-700" title="Delete goal" aria-label={`Delete ${goal.name}`}><Trash2 size={17} /></button>
        </div>
        <span className="mt-3 inline-flex items-center gap-1 rounded-full border border-slate-200 px-2.5 py-1 text-sm font-semibold text-slate-800 sm:absolute sm:right-0 sm:top-7 sm:mt-0"><CalendarDays size={14} />{deadline}</span>
        <h2 className="mt-4 text-xl font-bold text-slate-950 sm:text-2xl">{goal.name}</h2>
        <div className="mt-4 grid grid-cols-2 gap-4"><div><p className="text-xs text-slate-500">CURRENT</p><p className="mt-1 text-xl font-bold text-emerald-500">{rupees(goal.current)}</p></div><div><p className="text-xs text-slate-500">TARGET</p><p className="mt-1 text-xl font-bold text-slate-950">{rupees(goal.target)}</p></div></div>
        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-violet-500" style={{ width: `${progress}%` }} /></div>
        <p className="mt-3 text-sm text-slate-500">{rupees(remaining)} left to save</p>
      </div>
    </div>
  </article>;
}

/** Show API-backed goal cards with real add, edit and delete actions. */
export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState("");

  /** Fetch financial goals from the protected API. */
  const load = async () => { try { setGoals((await api("/goals")).goals); } catch (requestError) { setError(requestError.message); } };
  useEffect(() => { load(); }, []);
  /** Delete a confirmed goal, then refresh the goal card list. */
  const remove = async (id) => { await api(`/goals/${id}`, { method: "DELETE" }); setDeleting(null); load(); };

  return <section className="mx-auto max-w-[1480px]"><div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div><h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-[38px]">Financial Goals</h1><p className="mt-1 text-base text-slate-500">Dream, save, achieve.</p></div><button onClick={() => setEditing({})} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 sm:w-auto"><Plus size={20} /> Add Goal</button></div>{error && <p className="mt-4 text-rose-500">{error}</p>}<div className="mt-8 grid gap-5 xl:grid-cols-2">{goals.map((goal) => <GoalCard key={goal._id} goal={goal} onEdit={setEditing} onDelete={setDeleting} />)}</div>{goals.length === 0 && <p className="mt-8 rounded-2xl bg-white p-8 text-center text-slate-500">No goals added yet.</p>}{editing && <GoalModal goal={editing._id ? editing : null} close={() => setEditing(null)} reload={load} />}<DeleteModal goal={deleting} close={() => setDeleting(null)} confirm={remove} /></section>;
}
