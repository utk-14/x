import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div
        className="flex min-h-screen items-center justify-center
      bg-gradient-to-br from-sky-100 via-indigo-50 to-fuchsia-100 font-dyslexic"
      >
        <div
          className="rounded-3xl border border-indigo-100 bg-white/95 p-6 text-center shadow-lg backdrop-blur-md
        transition-all duration-300"
        >
          <p className="text-lg leading-relaxed tracking-wide text-indigo-900">
            Redirecting to login...
          </p>

          <div
            className="mx-auto mt-4 h-6 w-6 animate-spin rounded-full
          border-2 border-indigo-200 border-t-indigo-600"
          />
        </div>

        <Navigate to="/" replace />
      </div>
    );
  }

  return <Outlet />;
}
