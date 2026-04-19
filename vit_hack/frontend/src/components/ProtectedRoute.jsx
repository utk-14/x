import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-[#eef2ff] via-[#f5f3ff] to-[#eef2ff]
      font-[Lexend,OpenDyslexic,sans-serif]">
        
        <div className="text-center p-6 rounded-3xl
        bg-white/90 backdrop-blur-md shadow-lg border border-[#dbeafe]
        transition-all duration-300">
          
          <p className="text-lg text-[#3730a3] tracking-wide leading-relaxed">
            Redirecting to login...
          </p>

          <div className="mt-4 h-6 w-6 mx-auto animate-spin rounded-full
          border-2 border-[#c7d2fe] border-t-[#6366f1]"></div>
        </div>

        <Navigate to="/" />
      </div>
    );
  }

  return children;
}