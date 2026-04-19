export default function Loader({
  text = 'Loading your lesson... ✨',
}) {
  return (
    <div
      className="flex items-center gap-4 px-5 py-3 rounded-2xl
      bg-gradient-to-r from-[#eef2ff]/90 via-[#f5f3ff]/90 to-[#eef2ff]/90
      backdrop-blur-md shadow-lg border border-[#dbeafe]/80
      transition-all duration-300 ease-out"
      role="status"
      aria-live="polite"
    >
      {/* Spinner */}
      <span
        className="h-6 w-6 animate-spin rounded-full
        border-2 border-[#c7d2fe] border-t-[#6366f1]
        shadow-sm"
      />

      {/* Optional pulse glow behind spinner */}
      <span className="absolute h-8 w-8 rounded-full bg-[#a5b4fc] opacity-20 blur-xl animate-pulse"></span>

      {/* Text */}
      <span
        className="text-lg text-[#312e81] tracking-wide leading-relaxed
        font-medium font-dyslexic"
      >
        {text}
      </span>
    </div>
  )
}