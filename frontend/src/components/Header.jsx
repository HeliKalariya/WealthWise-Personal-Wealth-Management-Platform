import { Search, Target, WalletCards, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";

const resultLimit = 8;

/** Search the current user's saved transactions, goals, and budgets from the header. */
export default function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");

  /** Load searchable records once after the authenticated header is displayed. */
  useEffect(() => {
    const loadSearchRecords = async () => {
      try {
        const [transactionResponse, goalResponse, budgetResponse] =
          await Promise.all([
            api("/transactions"),
            api("/goals"),
            api("/budgets"),
          ]);
        const transactions = transactionResponse.transactions.map((item) => ({
          id: item._id,
          title: item.description || item.category,
          detail: `${item.category} · ₹${item.amount}`,
          route: item.type === "income" ? "/income" : "/expenses",
          kind: item.type === "income" ? "Income" : "Expense",
          Icon: WalletCards,
        }));
        const goals = goalResponse.goals.map((item) => ({
          id: item._id,
          title: item.name,
          detail: `Goal · ₹${item.current} of ₹${item.target}`,
          route: "/goals",
          kind: "Goal",
          Icon: Target,
        }));
        const budgets = budgetResponse.budgets.map((item) => ({
          id: item._id,
          title: `${item.category} budget`,
          detail: `Budget · ₹${item.amount} · ${item.month}`,
          route: "/budgets",
          kind: "Budget",
          Icon: WalletCards,
        }));
        setRecords([...transactions, ...goals, ...budgets]);
      } catch (requestError) {
        setError(requestError.message);
      }
    };
    void loadSearchRecords();
  }, []);

  /** Filter only live API records that match the user-entered text. */
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return records
      .filter((record) =>
        `${record.title} ${record.detail} ${record.kind}`
          .toLowerCase()
          .includes(normalized),
      )
      .slice(0, resultLimit);
  }, [query, records]);

  /** Navigate to the selected feature page and close the result list. */
  const chooseResult = (record) => {
    navigate(record.route);
    setQuery("");
  };

  const initials =
    user?.name
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "WW";

  return (
    <div className="flex h-16 w-full items-center  justify-between gap-4">
      <div className="relative max-w-2xl flex-1">
        <Search
          size={18}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-gray-400"
        />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search transactions, goals, budgets..."
          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-11 pr-10 text-sm text-gray-700 placeholder:text-gray-400 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
            aria-label="Clear search"
          >
            <X size={17} />
          </button>
        )}
        {query && (
          <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
            {results.map((record) => {
              const Icon = record.Icon;
              return (
                <button
                  key={`${record.kind}-${record.id}`}
                  onClick={() => chooseResult(record)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-slate-50"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600">
                    <Icon size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-slate-900">
                      {record.title}
                    </span>
                    <span className="block truncate text-xs text-slate-500">
                      {record.detail}
                    </span>
                  </span>
                  <span className="text-xs font-medium text-slate-400">
                    {record.kind}
                  </span>
                </button>
              );
            })}
            {!results.length && (
              <p className="px-4 py-5 text-center text-sm text-slate-500">
                {error
                  ? "Search is temporarily unavailable."
                  : "No matching saved records."}
              </p>
            )}
          </div>
        )}
      </div>
      <div className="ml-auto flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-full p-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
            {initials}
          </div>
          <h4 className="hidden text-lg font-bold sm:block">
            {user?.name || "User"}
          </h4>
        </div>
      </div>
    </div>
  );
}
