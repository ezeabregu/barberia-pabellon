const API_BASE = import.meta.env.VITE_API_BASE_URL || "";
const TOKEN_KEY = "admin_token";

export const tokenStorage = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

async function request(path, { method = "GET", body, auth = false, query } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = tokenStorage.get();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let url = `${API_BASE}${path}`;
  if (query) {
    const filtered = Object.fromEntries(
      Object.entries(query).filter(([, v]) => v !== undefined && v !== null && v !== ""),
    );
    const qs = new URLSearchParams(filtered).toString();
    if (qs) url += `?${qs}`;
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    /* empty body */
  }

  if (!res.ok) {
    const err = new Error(data?.error || `Error ${res.status}`);
    err.status = res.status;
    err.body = data;
    throw err;
  }

  return data;
}

export const api = {
  loginAdmin: (password) =>
    request("/api/admin/login", { method: "POST", body: { password } }),
  createBooking: (booking) =>
    request("/api/bookings", { method: "POST", body: booking }),
  getBookings: (query) => request("/api/bookings", { auth: true, query }),
  updateBookingStatus: (id, estado) =>
    request(`/api/bookings/${id}`, {
      method: "PATCH",
      body: { estado },
      auth: true,
    }),
  deleteBooking: (id) =>
    request(`/api/bookings/${id}`, { method: "DELETE", auth: true }),
};
