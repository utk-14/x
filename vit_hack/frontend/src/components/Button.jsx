export default function Button({
  children,
  className = '',
  variant = 'primary',
  ...props
}) {
  const base =
    'rounded-2xl px-6 py-3 text-lg font-semibold tracking-wide leading-relaxed transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 font-[Lexend,OpenDyslexic,sans-serif] active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed'

  const variants = {
    primary:
      'bg-gradient-to-r from-[#5f9cff] via-[#7aa8ff] to-[#a18cd1] text-white shadow-md hover:shadow-xl hover:brightness-110 hover:scale-[1.02] focus-visible:outline-[#5f9cff]',

    secondary:
      'bg-white/90 backdrop-blur text-[#1f2937] border-2 border-[#a5b4fc] hover:bg-[#eef2ff] hover:scale-[1.02] shadow-sm hover:shadow-md focus-visible:outline-[#6366f1]',

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