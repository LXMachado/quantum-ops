import { Link } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'

const Header = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="glass-panel glow-ring flex items-center justify-between rounded-[32px] border border-gray-200 dark:border-white/10 px-6 py-5 shadow-[0_35px_55px_-40px_rgba(57,115,255,0.85)]">
      <div>
        <p className="text-xs uppercase tracking-[0.45em] text-gray-600 dark:text-slate-400">AI Agency</p>
        <h1 className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">Operations Command Center</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:flex">
          <input
            type="text"
            placeholder="Search clients, jobs, or projects..."
            className="w-64 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-2 text-sm text-gray-900 dark:text-slate-100 placeholder:text-gray-500 dark:placeholder:text-slate-400/80 focus:border-sky-400/70 focus:outline-none"
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs uppercase tracking-widest text-gray-500 dark:text-slate-400/80">
            ⌘K
          </span>
        </div>

        <button
          onClick={toggleTheme}
          className="rounded-full border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/10 px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white transition hover:border-sky-400/70 hover:bg-sky-500/30"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>

        <Link
          to="/login"
          className="hidden rounded-2xl border border-gray-200 dark:border-white/10 px-4 py-2 text-sm font-semibold text-gray-900 dark:text-slate-100 transition hover:border-sky-500/70 hover:text-white lg:inline"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="glass-button rounded-2xl px-4 py-2 text-sm font-semibold text-white"
        >
          Register
        </Link>

        <div className="ml-2 hidden h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-indigo-500 to-blue-600 font-semibold text-white shadow-lg shadow-blue-500/40 sm:flex">
          AM
        </div>
      </div>
    </header>
  )
}

export default Header
