import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authApi";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Loader from "../../components/Loader";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      const res = await loginUser(form);

      if (res.access_token) {
        // 🔥 FIX: Store the token
        localStorage.setItem("token", res.access_token);
        console.log("✅ Token stored:", res.access_token);
        
        navigate("/start");
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4
      bg-gradient-to-br from-[#5f9cff] via-[#7aa8ff] to-[#a18cd1]
      relative overflow-hidden"
    >
      {/* Soft background glow */}
      <div className="absolute w-72 h-72 bg-white/20 rounded-full blur-3xl top-[-50px] left-[-50px]"></div>
      <div className="absolute w-72 h-72 bg-[#a18cd1]/30 rounded-full blur-3xl bottom-[-50px] right-[-50px]"></div>

      <Card className="w-full max-w-md text-center backdrop-blur-xl">
        
        {/* Title */}
        <h1 className="text-3xl font-semibold mb-2
        text-[#0f172a]
        font-[Lexend,OpenDyslexic,sans-serif] tracking-wide">
          👋 Welcome Back!
        </h1>

        <p className="text-[#475569] mb-6
        font-[Lexend,OpenDyslexic,sans-serif]">
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
          font-[Lexend,OpenDyslexic,sans-serif]"
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
          font-[Lexend,OpenDyslexic,sans-serif]"
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
        font-[Lexend,OpenDyslexic,sans-serif]">
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