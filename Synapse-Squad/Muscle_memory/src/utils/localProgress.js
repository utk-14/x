const LOG_KEY = "mm_letter_progress_log";

/**
 * Append-only local log (last 300 entries). No server.
 */
export function recordLetterResult(entry) {
  const row = {
    ...entry,
    at: new Date().toISOString(),
  };
  let list = [];
  try {
    const raw = localStorage.getItem(LOG_KEY);
    list = raw ? JSON.parse(raw) : [];
  } catch {
    list = [];
  }
  if (!Array.isArray(list)) list = [];
  list.push(row);
  try {
    localStorage.setItem(LOG_KEY, JSON.stringify(list.slice(-300)));
  } catch {
    /* quota */
  }
}

export function readProgressLog() {
  try {
    const raw = localStorage.getItem(LOG_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}
