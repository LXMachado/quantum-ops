import { Link, useLocation } from 'react-router-dom'
import { Calendar as CalendarIcon, ClipboardList, GaugeCircle, Users2, Workflow } from 'lucide-react'

const Sidebar = () => {
  const location = useLocation()

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: GaugeCircle },
    { path: '/calendar', label: 'Calendar', icon: CalendarIcon },
    { path: '/clients', label: 'Clients', icon: Users2 },
    { path: '/jobs', label: 'Jobs', icon: ClipboardList },
    { path: '/projects', label: 'Projects', icon: Workflow },
  ]

  return (
    <>
      <aside className="glass-panel glow-ring hidden w-[280px] flex-col rounded-[32px] border border-gray-200 dark:border-white/10 p-6 shadow-[0_25px_45px_-35px_rgba(30,64,175,0.65)] backdrop-blur-2xl lg:flex">
        <div className="mb-10 flex items-center gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/40">
            <span className="text-lg font-black tracking-tight text-white">AI</span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gray-600 dark:text-slate-400">Agency</p>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Control Hub</h2>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-2">
          {menuItems.map(item => {
            const isActive = location.pathname === item.path
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group relative flex items-center gap-3 overflow-hidden rounded-2xl px-5 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-br from-sky-500/90 via-indigo-500/90 to-blue-500/80 text-white shadow-lg shadow-blue-500/40'
                    : 'text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full transition-opacity ${
                    isActive ? 'bg-white/90' : 'bg-gray-400 dark:bg-white/50 group-hover:opacity-80'
                  }`}
                />
                <Icon size={18} />
                <span className="tracking-wide">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="mt-10 rounded-3xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-5 text-xs text-gray-700 dark:text-slate-300">
          <p className="font-semibold text-gray-900 dark:text-white">Upgrade to Pro</p>
          <p className="mt-2 leading-relaxed text-gray-600 dark:text-slate-300/90">
            Unlock AI-powered insights, predictive analytics, and automated reporting tailored for your agency.
          </p>
          <button className="mt-4 w-full rounded-2xl bg-gray-100 dark:bg-white/10 px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white transition hover:bg-gray-200 dark:hover:bg-white/20">
            Explore Plans
          </button>
        </div>
      </aside>

      <nav className="glass-panel fixed bottom-6 left-1/2 z-40 flex w-[92%] max-w-xl -translate-x-1/2 items-center justify-around rounded-[28px] border border-gray-200 dark:border-white/10 px-4 py-3 text-xs text-gray-800 dark:text-slate-200 shadow-[0_20px_45px_-30px_rgba(37,99,235,0.85)] lg:hidden">
        {menuItems.map(item => {
          const isActive = location.pathname === item.path
          const Icon = item.icon
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-1 flex-col items-center gap-1 rounded-2xl px-3 py-2 transition ${
                isActive ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-slate-300'
              }`}
            >
              <Icon size={18} />
              <span className="text-[10px] uppercase tracking-[0.3em]">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}

export default Sidebar
