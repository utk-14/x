import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../api/authApi";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Loader from "../../components/Loader";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all details");
      return;
    }

    try {
      setLoading(true);
      await signupUser(form);

      alert("Signup successful! Please login.");
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err);
      alert(err.message || "Signup failed");
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
      {/* Soft glow background */}
      <div className="absolute w-72 h-72 bg-white/20 rounded-full blur-3xl top-[-60px] left-[-60px]"></div>
      <div className="absolute w-72 h-72 bg-[#a18cd1]/30 rounded-full blur-3xl bottom-[-60px] right-[-60px]"></div>

      <Card className="w-full max-w-md text-center backdrop-blur-xl">
        
        {/* Title */}
        <h1 className="text-3xl font-semibold mb-2
        text-[#0f172a]
        font-[Lexend,OpenDyslexic,sans-serif] tracking-wide">
          🎉 Create Account
        </h1>

        <p className="text-[#475569] mb-6
        font-[Lexend,OpenDyslexic,sans-serif]">
          Start your fun learning journey 🚀
        </p>

        {/* Name */}
        <input
          className="w-full mb-4 px-4 py-3 rounded-xl
          border border-[#c7d2fe]/80 bg-white/90
          focus:outline-none focus:ring-2 focus:ring-[#6366f1]
          focus:shadow-md transition-all duration-200
          placeholder:text-[#94a3b8]
          text-[16px] tracking-wide leading-relaxed
          font-[Lexend,OpenDyslexic,sans-serif]"
          placeholder="👤 Enter your name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        {/* Email */}
        <input
          className="w-full mb-4 px-4 py-3 rounded-xl
          border border-[#c7d2fe]/80 bg-white/90
          focus:outline-none focus:ring-2 focus:ring-[#6366f1]
          focus:shadow-md transition-all duration-200
          placeholder:text-[#94a3b8]
          text-[16px] tracking-wide leading-relaxed
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
          placeholder:text-[#94a3b8]
          text-[16px] tracking-wide leading-relaxed
          font-[Lexend,OpenDyslexic,sans-serif]"
          placeholder="🔒 Create a password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* Button / Loader */}
        {loading ? (
          <Loader text="Creating your account... ✨" />
        ) : (
          <Button onClick={handleSignup} className="w-full">
            Signup 🚀
          </Button>
        )}

        {/* Login redirect */}
        <p className="mt-6 text-[#4f46e5]
        font-[Lexend,OpenDyslexic,sans-serif]">
          Already have an account?
        </p>

        <button
          className="mt-2 text-[#6366f1] underline
          hover:text-[#4338ca] hover:scale-[1.02]
          transition-all duration-200"
          onClick={() => navigate("/")}
        >
          Go to Login 🔐
        </button>
      </Card>
    </div>
  );
}