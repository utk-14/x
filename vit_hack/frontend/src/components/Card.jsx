export default function Card({
  title,
  subtitle,
  children,
  className = '',
}) {
  return (
    <section
      className={`relative rounded-3xl p-6 shadow-md backdrop-blur-lg
      bg-gradient-to-br from-white/95 via-[#f8fbff]/90 to-[#eef2ff]/80
      border border-[#dbeafe]/80
      transition-all duration-300 ease-out hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.01]
      ${className}`}
    >
      {/* Decorative soft glow */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#a18cd1] opacity-25 rounded-full blur-3xl"></div>

      {/* Subtle inner glow */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-white/10 opacity-0 hover:opacity-100 transition duration-300"></div>

      {title && (
        <h2 className="text-2xl font-semibold tracking-wide leading-relaxed text-[#0f172a]
        font-[Lexend,OpenDyslexic,sans-serif]">
          {title}
        </h2>
      )}

      {subtitle && (
        <p className="mt-2 text-base text-[#475569] leading-relaxed tracking-wide
        font-[Lexend,OpenDyslexic,sans-serif]">
          {subtitle}
        </p>
      )}

      <div className="mt-5 text-[15px] leading-relaxed tracking-wide text-[#1e293b]
      font-[Lexend,OpenDyslexic,sans-serif]">
        {children}
      </div>
    </section>
  )
}