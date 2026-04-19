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
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await signupUser(form);

      navigate("/", {
        replace: true,
        state: {
          message:
            "Your account was created. Log in with your email and password.",
        },
      });
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-backdrop flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md text-center shadow-2xl">
        <h1 className="mb-2 font-dyslexic text-3xl font-semibold tracking-wide text-slate-900 dark:text-slate-50">
          Create account
        </h1>

        <p className="mb-6 font-dyslexic text-slate-600 dark:text-slate-300">
          Sign up
        </p>

        {error && (
          <div
            className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-left font-dyslexic text-sm text-red-800 dark:border-red-800 dark:bg-red-950/50 dark:text-red-200"
            role="alert"
          >
            {error}
          </div>
        )}

        <input
          className="mb-4 w-full rounded-xl border border-[#c7d2fe]/80 bg-white/90 px-4 py-3 font-dyslexic text-[16px] leading-relaxed tracking-wide text-slate-900 placeholder:text-slate-400 transition focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-50"
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          autoComplete="name"
        />

        <input
          className="mb-4 w-full rounded-xl border border-[#c7d2fe]/80 bg-white/90 px-4 py-3 font-dyslexic text-[16px] leading-relaxed tracking-wide text-slate-900 placeholder:text-slate-400 transition focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-50"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          autoComplete="email"
        />

        <input
          type="password"
          className="mb-5 w-full rounded-xl border border-[#c7d2fe]/80 bg-white/90 px-4 py-3 font-dyslexic text-[16px] leading-relaxed tracking-wide text-slate-900 placeholder:text-slate-400 transition focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-50"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          autoComplete="new-password"
        />

        {loading ? (
          <Loader text="Creating your account..." />
        ) : (
          <Button type="button" onClick={handleSignup} className="w-full">
            Sign up
          </Button>
        )}

        <p className="mt-6 font-dyslexic text-indigo-600 dark:text-indigo-300">
          Already have an account?
        </p>

        <button
          type="button"
          className="mt-2 font-dyslexic text-indigo-600 underline transition hover:text-indigo-800 dark:text-indigo-300 dark:hover:text-indigo-100"
          onClick={() => navigate("/start")}
        >
          Go to login
        </button>
      </Card>
    </div>
  );
}
