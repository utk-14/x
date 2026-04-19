export default function Card({
  title,
  subtitle,
  children,
  className = '',
}) {
  return (
    <section
      className={`relative overflow-hidden rounded-3xl border border-sky-100/90 bg-white/95 p-6 shadow-lg shadow-indigo-100/50 backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl dark:border-slate-600/50 dark:bg-slate-900/85 dark:shadow-slate-900/40
      ${className}`}
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br from-sky-200/40 to-fuchsia-200/30 blur-2xl dark:from-indigo-500/20 dark:to-fuchsia-500/15" />

      {title && (
        <h2 className="font-dyslexic text-2xl font-semibold leading-relaxed tracking-wide text-slate-900 dark:text-slate-50">
          {title}
        </h2>
      )}

      {subtitle && (
        <p className="mt-2 font-dyslexic text-base leading-relaxed tracking-wide text-slate-600 dark:text-slate-300">
          {subtitle}
        </p>
      )}

      <div className="relative z-[1] mt-5 font-dyslexic text-[15px] leading-relaxed tracking-wide text-slate-800 dark:text-slate-100">
        {children}
      </div>
    </section>
  )
}
