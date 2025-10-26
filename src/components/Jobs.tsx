import { useMemo, useState } from 'react'
import { Briefcase, CheckCircle2, Clock4, Workflow } from 'lucide-react'

type JobStatus = 'Briefing' | 'In Production' | 'In Review' | 'Launched'

interface Job {
  id: string
  title: string
  lead: string
  budget: string
  status: JobStatus
}

const statuses: JobStatus[] = ['Briefing', 'In Production', 'In Review', 'Launched']

const generateJobId = () => `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: 'job-1',
      title: 'Launch conversational concierge',
      lead: 'Jamie Fox',
      budget: '$48k',
      status: 'In Production',
    },
    {
      id: 'job-2',
      title: 'Optimize lead scoring engine',
      lead: 'Aiden Cole',
      budget: '$32k',
      status: 'In Review',
    },
    {
      id: 'job-3',
      title: 'Deploy analytics cockpit',
      lead: 'Morgan Lee',
      budget: '$56k',
      status: 'Launched',
    },
  ])

  const [newJob, setNewJob] = useState({
    title: '',
    lead: '',
    budget: '',
    status: 'Briefing' as JobStatus,
  })

  const overview = useMemo(() => {
    const counts = statuses.reduce(
      (acc, status) => {
        acc[status] = jobs.filter(job => job.status === status).length
        return acc
      },
      {} as Record<JobStatus, number>,
    )
    const throughput = Math.round((jobs.filter(job => job.status === 'Launched').length / Math.max(jobs.length, 1)) * 100)
    return { counts, throughput }
  }, [jobs])

  const addJob = () => {
    if (!newJob.title.trim() || !newJob.lead.trim() || !newJob.budget.trim()) {
      return
    }

    const job: Job = {
      id: generateJobId(),
      title: newJob.title.trim(),
      lead: newJob.lead.trim(),
      budget: newJob.budget.trim(),
      status: newJob.status,
    }

    setJobs(prev => [job, ...prev])
    setNewJob({ title: '', lead: '', budget: '', status: 'Briefing' })
  }

  const updateStatus = (id: string, status: JobStatus) => {
    setJobs(prev => prev.map(job => (job.id === id ? { ...job, status } : job)))
  }

  return (
    <section className="relative flex flex-col gap-8 text-gray-900 dark:text-gray-900 dark:text-slate-100">
      <div className="fade-in-up flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-gray-600 dark:text-slate-400">Delivery</p>
          <h2 className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white sm:text-4xl">
            Jobs & Production Timeline
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-gray-700 dark:text-slate-300">
            Rally your pods around precise execution checkpoints. Track ownership, budgets, and launch momentum from one unified slate.
          </p>
        </div>
        <div className="rounded-[26px] border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-3 text-sm text-gray-800 dark:text-slate-200 shadow-lg shadow-sky-500/20">
          <p className="text-xs uppercase tracking-[0.35em] text-gray-600 dark:text-slate-400">Throughput</p>
          <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">{overview.throughput}% jobs shipped</p>
        </div>
      </div>

      <div className="fade-in-delayed glass-panel rounded-[28px] border border-gray-200 dark:border-white/10 p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gray-600 dark:text-slate-400">New Job</p>
            <h3 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">Kick off scope</h3>
          </div>
          <span className="rounded-full border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/10 px-3 py-1 text-xs text-gray-800 dark:text-slate-200">
            Auto creates task cards
          </span>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-5">
          <input
            type="text"
            placeholder="Job headline"
            value={newJob.title}
            onChange={event => setNewJob(prev => ({ ...prev, title: event.target.value }))}
            className="md:col-span-2 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-2 text-sm text-gray-900 dark:text-slate-100 placeholder:text-gray-600 dark:text-slate-400 focus:border-sky-400 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Lead owner"
            value={newJob.lead}
            onChange={event => setNewJob(prev => ({ ...prev, lead: event.target.value }))}
            className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-2 text-sm text-gray-900 dark:text-slate-100 placeholder:text-gray-600 dark:text-slate-400 focus:border-sky-400 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Budget (e.g. $45k)"
            value={newJob.budget}
            onChange={event => setNewJob(prev => ({ ...prev, budget: event.target.value }))}
            className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-2 text-sm text-gray-900 dark:text-slate-100 placeholder:text-gray-600 dark:text-slate-400 focus:border-sky-400 focus:outline-none"
          />
          <select
            value={newJob.status}
            onChange={event => setNewJob(prev => ({ ...prev, status: event.target.value as JobStatus }))}
            className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-2 text-sm text-gray-900 dark:text-slate-100 focus:border-sky-400 focus:outline-none"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <button onClick={addJob} className="glass-button rounded-2xl px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white">
            Add To Timeline
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        <div className="glass-panel rounded-[28px] border border-gray-200 dark:border-white/10 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-gray-600 dark:text-slate-400">
                Current Jobs
              </p>
              <h3 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">Operational view</h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-800 dark:text-slate-200">
              <Clock4 size={16} />
              SLA window: 6.4 days
            </div>
          </div>
          <ul className="mt-6 space-y-4">
            {jobs.map(job => (
              <li
                key={job.id}
                className="flex flex-col gap-3 rounded-[26px] border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">{job.title}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.3em] text-gray-700 dark:text-slate-300">
                    Lead {job.lead} • {job.budget}
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                  <select
                    value={job.status}
                    onChange={event => updateStatus(job.id, event.target.value as JobStatus)}
                    className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.3em] text-gray-800 dark:text-slate-200 focus:border-sky-400 focus:outline-none"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <span
                    className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] ${
                      job.status === 'Launched'
                        ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200'
                        : job.status === 'In Review'
                        ? 'border-amber-400/40 bg-amber-400/10 text-amber-200'
                        : job.status === 'In Production'
                        ? 'border-sky-400/40 bg-sky-400/10 text-sky-200'
                        : 'border-purple-400/40 bg-purple-400/10 text-purple-200'
                    }`}
                  >
                    <Workflow size={16} />
                    {job.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-panel rounded-[28px] border border-gray-200 dark:border-white/10 p-6">
          <p className="text-xs uppercase tracking-[0.35em] text-gray-600 dark:text-slate-400">
            Forecast
          </p>
          <h3 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">Production Pipeline</h3>
          <div className="mt-6 space-y-5">
            <div className="flex items-center gap-4 rounded-3xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4">
              <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/10 p-2 text-gray-900 dark:text-white">
                <Briefcase size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-700 dark:text-slate-300 uppercase tracking-[0.3em]">
                  Briefing
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {overview.counts['Briefing']}
                </p>
              </div>
              <span className="ml-auto text-xs text-purple-300">+1 queued</span>
            </div>
            <div className="flex items-center gap-4 rounded-3xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4">
              <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/10 p-2 text-gray-900 dark:text-white">
                <Clock4 size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-700 dark:text-slate-300 uppercase tracking-[0.3em]">
                  In Production
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {overview.counts['In Production']}
                </p>
              </div>
              <span className="ml-auto text-xs text-sky-300">46h avg cycle</span>
            </div>
            <div className="flex items-center gap-4 rounded-3xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4">
              <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/10 p-2 text-gray-900 dark:text-white">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-700 dark:text-slate-300 uppercase tracking-[0.3em]">
                  Launch ready
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {overview.counts['Launched']}
                </p>
              </div>
              <span className="ml-auto text-xs text-emerald-300">0 blockers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Jobs
