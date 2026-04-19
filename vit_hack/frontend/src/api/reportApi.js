import { BASE_URL } from "../utils/constants";   // ✅ CORRECT for api folder
import { getAuthHeader } from "../utils/helpers";

export const reportApi = {
  async getReport() {
    const res = await fetch(`${BASE_URL}/alphabet/report`, {
      method: "GET",
      headers: {
        ...getAuthHeader(), // 🔐 token only
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.detail || "Failed to fetch report");
    }

    return data;
  },
};