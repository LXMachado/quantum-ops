import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  return (
    <div className="relative flex min-h-screen gap-6 overflow-hidden p-4 sm:p-6 lg:p-8 text-gray-900 dark:text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-32 h-72 w-72 rounded-full bg-sky-500/40 dark:bg-sky-500/40 blur-3xl" />
        <div className="absolute right-[-120px] top-32 h-80 w-80 rounded-full bg-violet-500/30 dark:bg-violet-500/30 blur-3xl" />
        <div className="absolute bottom-[-120px] left-1/3 h-96 w-96 rounded-full bg-cyan-400/20 dark:bg-cyan-400/20 blur-[140px]" />
      </div>
      <Sidebar />
      <div className="flex flex-1 flex-col gap-6 overflow-hidden pb-24 lg:pb-0">
        <Header />
        <main className="glass-panel glow-ring flex-1 overflow-y-auto rounded-[32px] border border-gray-200 dark:border-white/10 p-6 pb-28 sm:p-8 sm:pb-10 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
