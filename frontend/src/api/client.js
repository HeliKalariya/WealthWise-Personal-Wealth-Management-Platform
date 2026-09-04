const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/** Send an API request and throw a readable error when the request fails. */
export async function api(path, options = {}) {
  const token = localStorage.getItem("wealthwise_token");
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Something went wrong.");
  return data;
}
