import { BASE_URL } from "../utils/constants";
import { getAuthHeader } from "../utils/helpers";

export const finalTestApi = {
  async getFinalTest() {
    const res = await fetch(`${BASE_URL}/alphabet/final-test`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.detail || "Failed to fetch final test");
    }

    // vit_hack backend returns array directly
    return Array.isArray(data) ? data : [];
  },

  async submitFinalTest(answers) {
    const res = await fetch(`${BASE_URL}/alphabet/final-test/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(answers),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.detail || "Final test submission failed");
    }

    return data;
  },
};
