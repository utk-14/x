import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Button from "./Button";
import ThemeControls from "./ThemeControls";
import FontControls from "./FontControls";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header
      className="sticky top-0 z-20 border-b border-white/30 bg-gradient-to-r from-sky-400/95 via-indigo-400/95 to-fuchsia-400/95 backdrop-blur-md shadow-md"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link
          to="/start"
          className="font-dyslexic text-xl font-semibold tracking-wide text-white drop-shadow-sm transition hover:opacity-95 md:text-2xl"
        >
          LearnAble
        </Link>

        <div className="flex items-center gap-3">
          <FontControls />
          {user && (
            <Button
              variant="secondary"
              onClick={logout}
              className="text-base bg-white/95 text-slate-800 shadow-sm hover:bg-white"
            >
              Log out
            </Button>
          )}
          <ThemeControls />
        </div>
      </nav>
    </header>
  );
}
