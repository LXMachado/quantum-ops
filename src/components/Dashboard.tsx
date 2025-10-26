import { useEffect, useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  Activity,
  ArrowUpRight,
  Rocket,
  Sparkles,
  Target,
  Users,
} from 'lucide-react'

const revenueTrack = [
  { month: 'Jan', revenue: 86, inbound: 38 },
  { month: 'Feb', revenue: 92, inbound: 42 },
  { month: 'Mar', revenue: 128, inbound: 58 },
  { month: 'Apr', revenue: 154, inbound: 66 },
  { month: 'May', revenue: 171, inbound: 72 },
  { month: 'Jun', revenue: 196, inbound: 77 },
]

const channelMix = [
  { channel: 'LinkedIn', value: 42 },
  { channel: 'Referrals', value: 33 },
  { channel: 'Paid', value: 28 },
  { channel: 'Partners', value: 21 },
  { channel: 'Organic', value: 18 },
]

const sentimentMix = [
  { name: 'Promoters', value: 61, color: '#38bdf8' },
  { name: 'Passives', value: 29, color: '#6366f1' },
  { name: 'Detractors', value: 10, color: '#f97316' },
]

const pipelineStages = [
  { id: 'stage-1', label: 'Discovery', eta: '2.4d avg', status: 'Accelerating', gradient: 'from-sky-500/35 to-blue-500/25' },
  { id: 'stage-2', label: 'Design Sprint', eta: '3.1d avg', status: 'Stable', gradient: 'from-indigo-500/35 to-violet-500/25' },
  { id: 'stage-3', label: 'Validation', eta: '1.8d avg', status: 'Ahead', gradient: 'from-fuchsia-500/35 to-pink-500/25' },
  { id: 'stage-4', label: 'Launch Prep', eta: '1.2d avg', status: 'On Target', gradient: 'from-emerald-500/35 to-teal-500/25' },
]

const activityFeed = [
  { id: 'feed-1', title: 'Nova AI Concierge', detail: 'Prototype validated with 34 beta testers', time: '12m ago' },
  { id: 'feed-2', title: 'Horizon Labs', detail: 'Signed 6-month growth retainer', time: '28m ago' },
  { id: 'feed-3', title: 'StellarOps', detail: 'Automation pipeline shipped to production', time: '1h ago' },
  { id: 'feed-4', title: 'Glow Commerce', detail: 'Win rate improved by 18% week-over-week', time: '2h ago' },
]

const formatCurrency = (value: number) =>
  `$${value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}k`

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    revenue: 196,
    clients: 38,
    response: 2.3,
    pipeline: 1.82,
    winRate: 68,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        revenue: Math.min(prev.revenue + Math.random() * 3, 208),
        clients: prev.clients + (Math.random() > 0.7 ? 1 : 0),
        response: Math.max(1.8, prev.response - Math.random() * 0.05),
        pipeline: parseFloat((prev.pipeline + Math.random() * 0.03).toFixed(2)),
        winRate: Math.min(75, prev.winRate + Math.random() * 0.6),
      }))
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const summaryCards = useMemo(
    () => [
      {
        label: 'Monthly Revenue',
        value: formatCurrency(metrics.revenue),
        delta: '+8.4%',
        icon: Sparkles,
        accent: 'from-sky-500/70 to-indigo-500/70',
      },
      {
        label: 'Active Clients',
        value: `${metrics.clients}`,
        delta: '+5 onboarding',
        icon: Users,
        accent: 'from-purple-500/70 to-fuchsia-500/70',
      },
      {
        label: 'Avg Response',
        value: `${metrics.response.toFixed(1)}h`,
        delta: 'Automated 63%',
        icon: Activity,
        accent: 'from-emerald-500/70 to-teal-500/70',
      },
      {
        label: 'Pipeline Velocity',
        value: `${metrics.pipeline}x`,
        delta: 'Win rate ' + Math.round(metrics.winRate) + '%',
        icon: Rocket,
        accent: 'from-amber-500/70 to-orange-500/70',
      },
    ],
    [metrics],
  )

  const revenueGradientId = useMemo(
    () => `revenueGradient-${Math.random().toString(36).slice(2, 8)}`,
    [],
  )
  const barGradientId = useMemo(
    () => `channelGradient-${Math.random().toString(36).slice(2, 8)}`,
    [],
  )

  return (
    <section className="relative flex flex-col gap-8 text-gray-900 dark:text-gray-900 dark:text-gray-900 dark:text-slate-100">
      <div className="fade-in-up flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.35em] text-gray-600 dark:text-gray-600 dark:text-slate-400">
            Intelligence
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-gray-900 dark:text-gray-900 dark:text-white sm:text-4xl">
            Quantum Ops Command Center
          </h2>
          <p className="mt-3 text-sm text-gray-700 dark:text-gray-700 dark:text-slate-300">
            Pulse through revenue arcs, retention health, and pipeline momentum in real time.
            Synthesized by your AI analyst to stay aligned with board-level priorities.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="glass-button rounded-2xl px-5 py-2 text-sm font-semibold text-gray-900 dark:text-gray-900 dark:text-white">
              Generate Live Pulse
            </button>
            <button className="rounded-2xl border border-gray-200 dark:border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-gray-50 dark:bg-white/5 px-5 py-2 text-sm font-semibold text-gray-900 dark:text-gray-900 dark:text-slate-100 transition hover:border-sky-400/50 hover:text-gray-900 dark:text-gray-900 dark:text-white">
              Share Snapshot
            </button>
          </div>
        </div>
        <div className="glass-panel glow-ring rounded-[28px] border border-gray-200 dark:border-gray-200 dark:border-white/10 px-6 py-5 text-sm shadow-[0_35px_60px_-40px_rgba(37,99,235,0.9)]">
          <p className="text-xs uppercase tracking-[0.35em] text-gray-600 dark:text-gray-600 dark:text-slate-400">
            Signal Boost
          </p>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/30 text-sky-200">
              <Target size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-900 dark:text-white">
                94% retention on premium retainers
              </p>
              <p className="text-xs text-gray-700 dark:text-gray-700 dark:text-slate-300">Up 12% vs last quarter</p>
            </div>
          </div>
        </div>
      </div>

      <div className="fade-in-delayed grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map(card => {
          const Icon = card.icon
          return (
            <div
              key={card.label}
              className={`relative overflow-hidden rounded-[28px] border border-gray-200 dark:border-gray-200 dark:border-white/10 bg-gradient-to-br ${card.accent} px-6 py-6 shadow-[0_28px_60px_-38px_rgba(37,99,235,0.95)]`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.45em] text-gray-900 dark:text-gray-600 dark:text-gray-900 dark:text-gray-600 dark:text-white/70">
                    {card.label}
                  </p>
                  <p className="mt-4 text-3xl font-semibold text-gray-900 dark:text-gray-900 dark:text-white">
                    {card.value}
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-300 dark:border-gray-300 dark:border-white/30 bg-gray-200 dark:bg-gray-200 dark:bg-white/20 p-2 text-gray-900 dark:text-gray-800 dark:text-gray-900 dark:text-gray-800 dark:text-white/90">
                  <Icon size={22} />
                </div>
              </div>
              <p className="mt-5 flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-700 dark:text-gray-900 dark:text-gray-700 dark:text-white/80">
                {card.delta}
                <ArrowUpRight size={16} />
              </p>
            </div>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="glass-panel glow-ring rounded-[32px] border border-gray-200 dark:border-gray-200 dark:border-white/10 p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-gray-600 dark:text-gray-600 dark:text-slate-400">
                Revenue Trajectory
              </p>
              <h3 className="mt-2 text-xl font-semibold text-gray-900 dark:text-gray-900 dark:text-white">
                Compounded ARR Momentum
              </h3>
            </div>
            <span className="rounded-full border border-gray-200 dark:border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-gray-100 dark:bg-white/10 px-3 py-1 text-xs text-gray-800 dark:text-gray-800 dark:text-slate-200">
              +24% YoY
            </span>
          </div>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrack} margin={{ left: -20, right: 0 }}>
                <defs>
                  <linearGradient id={revenueGradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                    <stop offset="60%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0f172a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 10" stroke="rgba(148, 163, 184, 0.12)" />
                <XAxis dataKey="month" stroke="rgba(226, 232, 240, 0.45)" />
                <YAxis stroke="rgba(226, 232, 240, 0.45)" />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(15, 23, 42, 0.85)',
                    borderRadius: '16px',
                    border: '1px solid rgba(148, 163, 184, 0.25)',
                    color: '#e2e8f0',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#38bdf8"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill={`url(#${revenueGradientId})`}
                  dot={{ r: 3, strokeWidth: 2, stroke: '#1e293b', fill: '#38bdf8' }}
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel rounded-[32px] border border-gray-200 dark:border-gray-200 dark:border-white/10 p-6">
          <p className="text-xs uppercase tracking-[0.35em] text-gray-600 dark:text-gray-600 dark:text-slate-400">
            Pipeline Health
          </p>
          <h3 className="mt-2 text-xl font-semibold text-gray-900 dark:text-gray-900 dark:text-white">Delivery Velocity</h3>
          <ul className="mt-6 space-y-4">
            {pipelineStages.map(stage => (
              <li
                key={stage.id}
                className={`rounded-[24px] border border-gray-200 dark:border-gray-200 dark:border-white/10 bg-gradient-to-r ${stage.gradient} px-4 py-3`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-900 dark:text-white">{stage.label}</p>
                  <span className="text-xs uppercase tracking-[0.3em] text-gray-800 dark:text-gray-800 dark:text-slate-200">
                    {stage.status}
                  </span>
                </div>
                <p className="mt-2 text-xs text-gray-800 dark:text-gray-800 dark:text-slate-200">{stage.eta}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="glass-panel rounded-[32px] border border-gray-200 dark:border-gray-200 dark:border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-gray-600 dark:text-gray-600 dark:text-slate-400">
                Growth Inputs
              </p>
              <h3 className="mt-2 text-xl font-semibold text-gray-900 dark:text-gray-900 dark:text-white">Channel Performance</h3>
            </div>
            <span className="rounded-full border border-gray-200 dark:border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-gray-100 dark:bg-white/10 px-3 py-1 text-xs text-gray-800 dark:text-gray-800 dark:text-slate-200">
              Weekly view
            </span>
          </div>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelMix}>
                <defs>
                  <linearGradient id={barGradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.95} />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.4} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 10" stroke="rgba(148, 163, 184, 0.12)" />
                <XAxis dataKey="channel" stroke="rgba(226, 232, 240, 0.45)" />
                <YAxis stroke="rgba(226, 232, 240, 0.45)" />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(15, 23, 42, 0.85)',
                    borderRadius: '16px',
                    border: '1px solid rgba(148, 163, 184, 0.25)',
                    color: '#e2e8f0',
                  }}
                />
                <Bar dataKey="value" fill={`url(#${barGradientId})`} radius={[14, 14, 14, 14]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel rounded-[32px] border border-gray-200 dark:border-gray-200 dark:border-white/10 p-6">
          <p className="text-xs uppercase tracking-[0.35em] text-gray-600 dark:text-gray-600 dark:text-slate-400">
            Client Sentiment
          </p>
          <h3 className="mt-2 text-xl font-semibold text-gray-900 dark:text-gray-900 dark:text-white">NPS Pulse</h3>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentMix}
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={6}
                  dataKey="value"
                >
                  {sentimentMix.map(entry => (
                    <Cell key={entry.name} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: 'rgba(15, 23, 42, 0.85)',
                    borderRadius: '16px',
                    border: '1px solid rgba(148, 163, 184, 0.25)',
                    color: '#e2e8f0',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-around text-xs text-gray-700 dark:text-gray-700 dark:text-slate-300">
            {sentimentMix.map(segment => (
              <span key={segment.name} className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: segment.color }}
                />
                {segment.name}
              </span>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[32px] border border-gray-200 dark:border-gray-200 dark:border-white/10 p-6">
          <p className="text-xs uppercase tracking-[0.35em] text-gray-600 dark:text-gray-600 dark:text-slate-400">
            Stream Updates
          </p>
          <h3 className="mt-2 text-xl font-semibold text-gray-900 dark:text-gray-900 dark:text-white">Team Signals</h3>
          <ul className="mt-6 space-y-4 text-sm text-gray-800 dark:text-gray-800 dark:text-slate-200">
            {activityFeed.map(activity => (
              <li
                key={activity.id}
                className="rounded-3xl border border-gray-200 dark:border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-50 dark:bg-white/5 px-4 py-3"
              >
                <p className="font-semibold text-gray-900 dark:text-gray-900 dark:text-white">{activity.title}</p>
                <p className="mt-1 text-xs text-gray-700 dark:text-gray-700 dark:text-slate-300">{activity.detail}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.35em] text-gray-600 dark:text-gray-600 dark:text-slate-400">
                  {activity.time}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
