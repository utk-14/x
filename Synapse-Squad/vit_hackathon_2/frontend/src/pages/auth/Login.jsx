import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Loader from "../../components/Loader";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const bannerMessage = location.state?.message;

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      const res = await login(form);

      if (res.access_token) {
        navigate("/start", { replace: true });
      } else {
        alert(
          res.detail ||
            (typeof res.message === "string" ? res.message : null) ||
            "Invalid credentials"
        );
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-backdrop flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md text-center shadow-2xl">
        {bannerMessage && (
          <div
            className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 font-dyslexic text-sm text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100"
            role="status"
          >
            {bannerMessage}
          </div>
        )}

        <h1 className="text-3xl font-semibold mb-2
        text-[#0f172a]
        font-dyslexic tracking-wide">
          👋 Welcome Back!
        </h1>

        <p className="text-[#475569] mb-6
        font-dyslexic">
          Let’s continue your learning journey 🌟
        </p>

        {/* Email */}
        <input
          className="w-full mb-4 px-4 py-3 rounded-xl
          border border-[#c7d2fe]/80 bg-white/90
          focus:outline-none focus:ring-2 focus:ring-[#6366f1]
          focus:shadow-md transition-all duration-200
          text-[16px] tracking-wide leading-relaxed
          placeholder:text-[#94a3b8]
          font-dyslexic"
          placeholder="📧 Enter your email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* Password */}
        <input
          type="password"
          className="w-full mb-5 px-4 py-3 rounded-xl
          border border-[#c7d2fe]/80 bg-white/90
          focus:outline-none focus:ring-2 focus:ring-[#6366f1]
          focus:shadow-md transition-all duration-200
          text-[16px] tracking-wide leading-relaxed
          placeholder:text-[#94a3b8]
          font-dyslexic"
          placeholder="🔒 Enter your password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* Button / Loader */}
        {loading ? (
          <Loader text="Logging you in... 🚀" />
        ) : (
          <Button onClick={handleLogin} className="w-full">
            Login 🚀
          </Button>
        )}

        {/* Signup */}
        <p className="mt-6 text-[#4f46e5]
        font-dyslexic">
          Don’t have an account?
        </p>

        <button
          className="mt-2 text-[#6366f1] underline
          hover:text-[#4338ca] hover:scale-[1.02]
          transition-all duration-200"
          onClick={() => navigate("/signup")}
        >
          Go to Signup ✨
        </button>
      </Card>
    </div>
  );
}