import { BASE_URL } from "../utils/constants";

function formatDetail(detail) {
  if (detail == null) return null;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    return detail
      .map((d) =>
        typeof d === "object" && d !== null && "msg" in d ? d.msg : String(d)
      )
      .join("; ");
  }
  return String(detail);
}

/**
 * JSON fetch with BASE_URL. Throws on network failure, HTTP errors, and API `{ error: "..." }` bodies.
 */
export async function apiFetch(path, options = {}) {
  const url = `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const headers = { ...options.headers };

  if (
    options.body &&
    typeof options.body === "string" &&
    !headers["Content-Type"]
  ) {
    headers["Content-Type"] = "application/json";
  }

  let res;
  try {
    res = await fetch(url, { ...options, headers });
  } catch (e) {
    const isFetchFailed =
      e instanceof TypeError &&
      (e.message === "Failed to fetch" || e.message === "Load failed");
    throw new Error(
      isFetchFailed
        ? "Cannot reach the server. Start the backend on port 8000 (e.g. uvicorn app.main:app --reload) and use the app from the Vite dev server."
        : e.message || "Network error"
    );
  }

  const text = await res.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error("The server sent an invalid response.");
  }

  if (!res.ok) {
    const msg =
      formatDetail(data.detail) ||
      data.message ||
      (typeof data.error === "string" ? data.error : null) ||
      `Request failed (${res.status})`;
    throw new Error(msg);
  }

  if (data && typeof data.error === "string" && data.error) {
    throw new Error(data.error);
  }

  return data;
}
