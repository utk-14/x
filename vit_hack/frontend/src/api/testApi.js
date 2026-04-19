import { BASE_URL } from "../utils/constants";
import { getAuthHeader } from "../utils/helpers";

export const testApi = {
  async submitTypingTest(data) {
    const res = await fetch(`${BASE_URL}/alphabet/test/typing`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",   // 🔥 REQUIRED
        ...getAuthHeader(),                   // 🔐 token
      },
      body: JSON.stringify(data),
    });

    return res.json();
  },
};