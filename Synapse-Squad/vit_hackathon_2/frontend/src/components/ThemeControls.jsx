import { useLayoutEffect, useState } from "react";

const STORAGE_KEY = "brb-theme";

export default function ThemeControls() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(STORAGE_KEY) === "dark";
  });

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded-full border-2 border-white/50 bg-white/25 px-3 py-1.5 text-sm font-dyslexic text-white shadow-sm backdrop-blur transition hover:bg-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      aria-pressed={dark}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? "Light mode" : "Dark mode"}
    </button>
  );
}
