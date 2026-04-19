export default function Button({
  children,
  className = '',
  variant = 'primary',
  ...props
}) {
  const base =
    'rounded-2xl px-6 py-3 text-lg font-semibold tracking-wide leading-relaxed transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 font-dyslexic active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed'

  const variants = {
    primary:
      'bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 text-white shadow-md hover:shadow-xl hover:brightness-105 hover:scale-[1.02] focus-visible:outline-sky-500',

    secondary:
      'bg-white/95 backdrop-blur text-slate-800 border-2 border-indigo-200 hover:bg-indigo-50 hover:scale-[1.02] shadow-sm hover:shadow-md focus-visible:outline-indigo-500 dark:border-slate-500 dark:bg-slate-800/95 dark:text-slate-100 dark:hover:bg-slate-700',

    danger:
      'bg-gradient-to-r from-[#f87171] to-[#ef4444] text-white shadow-md hover:shadow-lg hover:brightness-110 hover:scale-[1.02] focus-visible:outline-[#ef4444]',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}