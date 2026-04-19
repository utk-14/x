export const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("❌ No token found");
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,   // 🔥 MUST be Bearer
  };
};