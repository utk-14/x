import { BASE_URL } from "../utils/constants";
import { getAuthHeader } from "../utils/helpers";

export const reportApi = {
  async getReport() {
    const res = await fetch(`${BASE_URL}/alphabet/report`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.detail || "Failed to fetch report");
    }

    return data;
  },
};
