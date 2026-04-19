import { BASE_URL } from "../utils/constants";
import { getAuthHeader } from "../utils/helpers";

export const testApi = {
  async submitTypingTest(data) {
    const res = await fetch(`${BASE_URL}/alphabet/test/typing`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();

    if (!res.ok) {
      throw new Error(responseData.detail || "Typing test submission failed");
    }

    return responseData;
  },
};
