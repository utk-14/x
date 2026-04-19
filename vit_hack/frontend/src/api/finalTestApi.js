import { BASE_URL } from "../utils/constants";
import { getAuthHeader } from "../utils/helpers";

export const finalTestApi = {
  async getFinalTest() {
    const res = await fetch(`${BASE_URL}/alphabet/final-test`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",   // 🔥 add this
        ...getAuthHeader(),                   // 🔐 token
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.detail || "Failed to fetch final test");
    }

    return data;
  },

  async submitFinalTest(answers) {
    const res = await fetch(`${BASE_URL}/alphabet/final-test/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),                   // 🔐 token
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