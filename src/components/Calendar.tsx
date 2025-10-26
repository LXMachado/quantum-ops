import { type ChangeEvent, useMemo, useState } from 'react'
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import addHours from 'date-fns/addHours'
import { enUS } from 'date-fns/locale'
import type { SlotInfo } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  color: string
  description?: string
}

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
})

const eventPalette = ['#4f46e5', '#0ea5e9', '#22d3ee', '#a855f7', '#14b8a6']

const generateId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`

const Calendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Kick-off: Nova AI Campaign',
      start: addHours(new Date(), 4),
      end: addHours(new Date(), 5),
      color: eventPalette[0],
      description: 'Creative sync with the growth pod.',
    },
    {
      id: '2',
      title: 'Client Debrief — Horizon Labs',
      start: addHours(new Date(), 30),
      end: addHours(new Date(), 32),
      color: eventPalette[1],
      description: 'Final review for Q2 scope.',
    },
    {
      id: '3',
      title: 'Prototype Delivery',
      start: addHours(new Date(), 72),
      end: addHours(new Date(), 74),
      color: eventPalette[3],
      description: 'Ship V1 of the onboarding assistant.',
    },
  ])

  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
  })

  const upcomingEvents = useMemo(
    () =>
      [...events]
        .sort((a, b) => a.start.getTime() - b.start.getTime())
        .slice(0, 5),
    [events],
  )

  const handleSelectSlot = (slot: SlotInfo) => {
    setNewEvent(prev => ({
      ...prev,
      date: format(slot.start, 'yyyy-MM-dd'),
      startTime: format(slot.start, 'HH:mm'),
      endTime: format(slot.end, 'HH:mm'),
    }))
  }

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.startTime || !newEvent.endTime) {
      return
    }

    const start = new Date(`${newEvent.date}T${newEvent.startTime}`)
    const end = new Date(`${newEvent.date}T${newEvent.endTime}`)

    const nextColor = eventPalette[(events.length + 1) % eventPalette.length]

    setEvents(prev => [
      ...prev,
      {
        id: generateId(),
        title: newEvent.title,
        start,
        end,
        color: nextColor,
        description: newEvent.description,
      },
    ])

    setNewEvent({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      description: '',
    })
  }

  return (
    <section className="relative flex flex-col gap-8 dark:text-slate-100 text-slate-900">
      <div className="fade-in-up flex flex-col gap-2">
        <p className="uppercase tracking-[0.35em] text-sm dark:text-slate-400 text-slate-500">Scheduling</p>
        <h2 className="text-3xl font-semibold dark:text-white text-slate-900 sm:text-4xl">Agency Mission Calendar</h2>
        <p className="max-w-xl text-sm dark:text-slate-300 text-slate-600">
          Plan campaigns, automate stakeholder syncs, and forecast deliverables with an adaptive calendar experience inspired by Apple and Google flows.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="glass-panel glow-ring fade-in-delayed h-[720px] rounded-[28px] border border-white/10 p-4 sm:p-6">
          <BigCalendar<CalendarEvent>
            className="ai-calendar"
            localizer={localizer}
            events={events}
            defaultView="month"
            views={['month', 'week', 'day', 'agenda']}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectSlot={handleSelectSlot}
            eventPropGetter={(event: CalendarEvent) => ({
              style: {
                backgroundColor: event.color,
                borderRadius: '16px',
                border: 'none',
                padding: '4px 10px',
                color: '#1f2937',
                boxShadow: '0 12px 24px -12px rgba(59, 130, 246, 0.8)',
              },
            })}
            popup
          />
        </div>

        <aside className="glass-panel fade-in-slow flex h-full flex-col gap-6 rounded-[28px] border border-white/10 p-6">
          <div>
            <h3 className="text-lg font-semibold dark:text-white text-slate-900">Create a Moment</h3>
            <p className="text-xs uppercase tracking-[0.35em] dark:text-slate-400 text-slate-500">Quick Add</p>
          </div>

          <div className="flex flex-col gap-4">
            <input
              value={newEvent.title}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setNewEvent(prev => ({ ...prev, title: event.target.value }))
              }
              type="text"
              placeholder="Session title"
              className="w-full rounded-2xl border dark:border-white/10 border-slate-200 dark:bg-white/5 bg-slate-50 px-4 py-2 text-sm dark:text-slate-100 text-slate-900 dark:placeholder:text-slate-400 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                value={newEvent.date}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setNewEvent(prev => ({ ...prev, date: event.target.value }))
                }
                type="date"
                className="rounded-2xl border dark:border-white/10 border-slate-200 dark:bg-white/5 bg-slate-50 px-4 py-2 text-sm dark:text-slate-100 text-slate-900 focus:border-sky-400 focus:outline-none"
              />
              <input
                value={newEvent.startTime}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setNewEvent(prev => ({ ...prev, startTime: event.target.value }))
                }
                type="time"
                className="rounded-2xl border dark:border-white/10 border-slate-200 dark:bg-white/5 bg-slate-50 px-4 py-2 text-sm dark:text-slate-100 text-slate-900 focus:border-sky-400 focus:outline-none"
              />
              <input
                value={newEvent.endTime}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setNewEvent(prev => ({ ...prev, endTime: event.target.value }))
                }
                type="time"
                className="rounded-2xl border dark:border-white/10 border-slate-200 dark:bg-white/5 bg-slate-50 px-4 py-2 text-sm dark:text-slate-100 text-slate-900 focus:border-sky-400 focus:outline-none"
              />
              <input
                value={newEvent.description}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setNewEvent(prev => ({ ...prev, description: event.target.value }))
                }
                type="text"
                placeholder="Optional description"
                className="col-span-2 rounded-2xl border dark:border-white/10 border-slate-200 dark:bg-white/5 bg-slate-50 px-4 py-2 text-sm dark:text-slate-100 text-slate-900 dark:placeholder:text-slate-400 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
              />
            </div>
            <button
              onClick={handleAddEvent}
              className="glass-button rounded-2xl px-4 py-2 text-sm font-semibold text-white"
            >
              Schedule Event
            </button>
          </div>

          <div className="mt-2 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.35em] dark:text-slate-400 text-slate-500">
              Upcoming Highlights
            </h3>
            <ul className="space-y-3">
              {upcomingEvents.map(event => (
                <li key={event.id} className="rounded-2xl border dark:border-white/10 border-slate-200 dark:bg-white/5 bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] dark:text-slate-400 text-slate-500">
                    {format(event.start, 'EEE, MMM d • HH:mm')}
                  </p>
                  <p className="mt-1 text-base font-semibold dark:text-white text-slate-900">{event.title}</p>
                  {event.description && (
                    <p className="mt-1 text-sm dark:text-slate-300/90 text-slate-600">{event.description}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default Calendar
