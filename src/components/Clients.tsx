import { useMemo, useState } from 'react'
import { ArrowUpRight, Mail, Sparkles, Users } from 'lucide-react'

type Segment = 'Retainer' | 'On-Demand' | 'Venture Partner'

interface Client {
  id: string
  name: string
  email: string
  segment: Segment
  status: 'Active' | 'Exploring' | 'Churn Risk'
}

const generateClientId = () => `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([
    {
      id: 'client-1',
      name: 'Horizon Labs',
      email: 'ops@horizonlabs.ai',
      segment: 'Retainer',
      status: 'Active',
    },
    {
      id: 'client-2',
      name: 'Nova Collective',
      email: 'team@novaco.co',
      segment: 'On-Demand',
      status: 'Exploring',
    },
    {
      id: 'client-3',
      name: 'StellarOps',
      email: 'hello@stellarops.io',
      segment: 'Venture Partner',
      status: 'Active',
    },
  ])

  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    segment: 'Retainer' as Segment,
  })

  const clientSummary = useMemo(() => {
    const total = clients.length
    const active = clients.filter(client => client.status === 'Active').length
    const exploring = clients.filter(client => client.status === 'Exploring').length
    const retainer = clients.filter(client => client.segment === 'Retainer').length
    return { total, active, exploring, retainer }
  }, [clients])

  const addClient = () => {
    if (!newClient.name.trim() || !newClient.email.trim()) {
      return
    }

    const client: Client = {
      id: generateClientId(),
      name: newClient.name.trim(),
      email: newClient.email.trim(),
      segment: newClient.segment,
      status: 'Exploring',
    }

    setClients(prev => [client, ...prev])
    setNewClient({ name: '', email: '', segment: 'Retainer' })
  }

  return (
    <section className="relative flex flex-col gap-8 text-gray-900 dark:text-slate-100">
      <div className="fade-in-up flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-gray-600 dark:text-slate-400">Roster</p>
          <h2 className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white sm:text-4xl">
            Client Experience Radar
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-gray-700 dark:text-slate-300">
            Harmonize touchpoints and expand high-retention partners. Activate AI nudges to keep every relationship glowing.
          </p>
        </div>
        <div className="rounded-[26px] border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-3 text-sm text-gray-800 dark:text-slate-200 shadow-lg shadow-sky-500/20">
          <p className="text-xs uppercase tracking-[0.35em] text-gray-600 dark:text-slate-400">Advocacy</p>
          <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">94% satisfaction streak</p>
        </div>
      </div>

      <div className="fade-in-delayed glass-panel rounded-[28px] border border-gray-200 dark:border-white/10 p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gray-600 dark:text-slate-400">
              Add Relationship
            </p>
            <h3 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
              Quick intake
            </h3>
          </div>
          <button className="flex items-center gap-2 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-gray-800 dark:text-slate-200 transition hover:border-sky-400/50 hover:text-gray-900 dark:text-white">
            Import CRM <ArrowUpRight size={16} />
          </button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <input
            type="text"
            placeholder="Client name"
            value={newClient.name}
            onChange={event => setNewClient(prev => ({ ...prev, name: event.target.value }))}
            className="md:col-span-2 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-2 text-sm text-gray-900 dark:text-slate-100 placeholder:text-gray-600 dark:text-slate-400 focus:border-sky-400 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Contact email"
            value={newClient.email}
            onChange={event => setNewClient(prev => ({ ...prev, email: event.target.value }))}
            className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-2 text-sm text-gray-900 dark:text-slate-100 placeholder:text-gray-600 dark:text-slate-400 focus:border-sky-400 focus:outline-none"
          />
          <select
            value={newClient.segment}
            onChange={event =>
              setNewClient(prev => ({ ...prev, segment: event.target.value as Segment }))
            }
            className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-2 text-sm text-gray-900 dark:text-slate-100 focus:border-sky-400 focus:outline-none"
          >
            <option value="Retainer">Retainer</option>
            <option value="On-Demand">On-Demand</option>
            <option value="Venture Partner">Venture Partner</option>
          </select>
          <button
            onClick={addClient}
            className="glass-button rounded-2xl px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white md:col-span-1"
          >
            Save Client
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        <div className="glass-panel rounded-[28px] border border-gray-200 dark:border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-gray-600 dark:text-slate-400">
                Relationship Graph
              </p>
              <h3 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">Active Clients</h3>
            </div>
            <span className="rounded-full border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/10 px-3 py-1 text-xs text-gray-800 dark:text-slate-200">
              Sorted by newest
            </span>
          </div>
          <ul className="mt-6 space-y-4">
            {clients.map(client => (
              <li
                key={client.id}
                className="flex flex-col gap-3 rounded-[26px] border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-indigo-500 to-blue-600 text-sm font-semibold text-gray-900 dark:text-white shadow-lg shadow-blue-500/40">
                    {client.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">{client.name}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-slate-300">
                      <Mail size={14} />
                      {client.email}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
                  <span className="rounded-full border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-gray-800 dark:text-slate-200">
                    {client.segment}
                  </span>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] ${
                      client.status === 'Active'
                        ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200'
                        : client.status === 'Exploring'
                        ? 'border-sky-400/40 bg-sky-400/10 text-sky-200'
                        : 'border-amber-400/40 bg-amber-400/10 text-amber-200'
                    }`}
                  >
                    {client.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-panel rounded-[28px] border border-gray-200 dark:border-white/10 p-6">
          <p className="text-xs uppercase tracking-[0.35em] text-gray-600 dark:text-slate-400">
            Health Pulse
          </p>
          <h3 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">Engagement Overview</h3>
          <div className="mt-6 space-y-5">
            <div className="flex items-center gap-4 rounded-3xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4">
              <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/10 p-2 text-gray-900 dark:text-white">
                <Users size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-700 dark:text-slate-300 uppercase tracking-[0.3em]">
                  Active partners
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{clientSummary.active}</p>
              </div>
              <span className="ml-auto text-xs text-emerald-300">+3 this week</span>
            </div>
            <div className="flex items-center gap-4 rounded-3xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4">
              <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/10 p-2 text-gray-900 dark:text-white">
                <Sparkles size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-700 dark:text-slate-300 uppercase tracking-[0.3em]">
                  Retainer portfolio
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{clientSummary.retainer}</p>
              </div>
              <span className="ml-auto text-xs text-sky-300">92% utilization</span>
            </div>
            <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.35em] text-gray-600 dark:text-slate-400">
                expansion watch
              </p>
              <p className="mt-3 text-sm text-gray-800 dark:text-slate-200">
                {clientSummary.exploring} accounts evaluating premium automation.
                Enable win-back automations to keep NRR compounding.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Clients
