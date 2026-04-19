import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Button from './Button'
import ThemeControls from './ThemeControls'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav
      className="sticky top-0 z-10 px-6 py-4
      bg-gradient-to-r from-[#5f9cff]/95 via-[#7aa8ff]/90 to-[#a18cd1]/95
      backdrop-blur-lg shadow-lg border-b border-[#c7d2fe]/70
      transition-all duration-300"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        
        {/* Logo / Title */}
        <Link
          to="/dashboard"
          className="text-2xl md:text-3xl font-semibold tracking-wide
          text-white drop-shadow-md hover:opacity-90 transition
          font-[Lexend,OpenDyslexic,sans-serif]"
        >
          🌟 Bright Reading Buddy
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {user && (
            <Button
              variant="secondary"
              onClick={logout}
              className="text-base bg-white/90 hover:bg-white shadow-sm hover:shadow-md transition"
            >
              🚪 Logout
            </Button>
          )}
          <ThemeControls />
        </div>
      </div>

      {/* Subtle bottom glow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-60"></div>
    </nav>
  )
}