import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  closestCorners,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { CSSProperties } from 'react'
import { useMemo, useState } from 'react'

type ColumnKey = 'backlog' | 'inProgress' | 'review' | 'launch'

interface Task {
  id: string
  title: string
  owner: string
  tag: string
  eta: string
  column: ColumnKey
}

const columnConfig: Record<
  ColumnKey,
  {
    title: string
    accent: string
    gradient: string
    code: string
  }
> = {
  backlog: {
    title: 'Intake',
    accent: 'dark:text-slate-300 text-slate-600',
    gradient: 'from-slate-500/25 to-slate-800/40',
    code: '# PLAN',
  },
  inProgress: {
    title: 'In Build',
    accent: 'dark:text-sky-300 text-sky-600',
    gradient: 'from-sky-500/25 to-blue-700/35',
    code: '# BUILD',
  },
  review: {
    title: 'QA Review',
    accent: 'dark:text-fuchsia-300 text-fuchsia-600',
    gradient: 'from-fuchsia-500/25 to-purple-700/35',
    code: '# REVIEW',
  },
  launch: {
    title: 'Ready to Ship',
    accent: 'dark:text-emerald-300 text-emerald-600',
    gradient: 'from-emerald-500/25 to-teal-700/35',
    code: '# LAUNCH',
  },
}

const initialBoard: Record<ColumnKey, Task[]> = {
  backlog: [
    {
      id: 'brief-agent',
      title: 'Draft onboarding flow prompts',
      owner: 'Jamie',
      tag: 'Conversation Design',
      eta: 'Due in 2d',
      column: 'backlog',
    },
    {
      id: 'persona-map',
      title: 'Persona mapping workshop',
      owner: 'Alex',
      tag: 'Strategy',
      eta: 'Due in 4d',
      column: 'backlog',
    },
  ],
  inProgress: [
    {
      id: 'voice-pack',
      title: 'Fine-tune voice pack v2',
      owner: 'Taylor',
      tag: 'Model Ops',
      eta: 'Today • 16:30',
      column: 'inProgress',
    },
    {
      id: 'demo-reel',
      title: 'Render demo reel loops',
      owner: 'Devon',
      tag: 'Creative',
      eta: 'In 6h',
      column: 'inProgress',
    },
  ],
  review: [
    {
      id: 'qa-audit',
      title: 'Conversation QA audit',
      owner: 'Morgan',
      tag: 'Quality',
      eta: 'Awaiting sign-off',
      column: 'review',
    },
  ],
  launch: [
    {
      id: 'rollout-plan',
      title: 'Rollout playbook + assets',
      owner: 'Riley',
      tag: 'Launch',
      eta: 'Scheduled',
      column: 'launch',
    },
  ],
}

const generateTaskId = () => `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`

const KanbanCard = ({ task }: { task: Task }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { column: task.column },
  })

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.68 : 1,
  }

  return (
    <article
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="group relative cursor-grab rounded-[28px] border dark:border-white/10 border-slate-200 dark:bg-white/10 bg-slate-50 px-5 py-5 dark:text-slate-100 text-slate-900 shadow-[0_30px_45px_-36px_rgba(14,165,233,0.75)] transition duration-200 hover:-translate-y-1.5 hover:border-sky-400/45 hover:shadow-[0_28px_55px_-34px_rgba(59,130,246,0.9)] active:cursor-grabbing"
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] dark:text-slate-400 text-slate-500">
        <span>{task.tag}</span>
        <span className="text-[11px] font-semibold dark:text-slate-300 text-slate-600">{task.eta}</span>
      </div>
      <h4 className="mt-4 text-lg font-semibold leading-tight dark:text-white text-slate-900">{task.title}</h4>
      <div className="mt-6 flex items-center justify-between text-sm dark:text-slate-300 text-slate-600">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-indigo-500 to-blue-600 text-xs font-semibold text-white shadow-lg shadow-blue-500/40">
            {task.owner.slice(0, 2).toUpperCase()}
          </div>
          <span className="font-medium">{task.owner}</span>
        </div>
        <span className="rounded-full border dark:border-white/10 border-slate-200 dark:bg-white/10 bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.3em] dark:text-slate-300 text-slate-600">
          Drag
        </span>
      </div>
    </article>
  )
}

const Column = ({
  columnKey,
  tasks,
  children,
}: {
  columnKey: ColumnKey
  tasks: Task[]
  children: React.ReactNode
}) => {
  const config = columnConfig[columnKey]
  const { isOver, setNodeRef } = useDroppable({ id: columnKey })

  return (
    <div className="flex h-full flex-col gap-4">
      <header className={`flex items-center justify-between rounded-3xl border dark:border-white/10 border-slate-200 dark:bg-gradient-to-br bg-gradient-to-br ${config.gradient} px-5 py-4 shadow-[0_24px_45px_-36px_rgba(99,102,241,0.6)]`}>
        <div>
          <p className={`text-xs uppercase tracking-[0.35em] ${config.accent}`}>{config.title}</p>
          <h3 className="mt-1 text-lg font-semibold dark:text-white text-slate-900">
            {tasks.length} {tasks.length === 1 ? 'Item' : 'Items'}
          </h3>
        </div>
        <div className="rounded-2xl border dark:border-white/15 border-slate-300 dark:bg-white/10 bg-slate-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.45em] dark:text-slate-200 text-slate-700">
          {config.code}
        </div>
      </header>

      <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className={`flex min-h-[240px] flex-1 flex-col gap-4 rounded-[28px] border dark:border-white/10 border-slate-200 dark:bg-white/5 bg-slate-50 p-4 transition ${
            isOver ? 'border-sky-400/60 bg-sky-500/10 shadow-[0_35px_65px_-50px_rgba(56,189,248,0.8)]' : ''
          }`}
        >
          {children}
          {tasks.length === 0 && (
            <div className="flex flex-1 items-center justify-center rounded-3xl border border-dashed dark:border-white/15 border-slate-300 dark:bg-white/[0.04] bg-slate-100 text-sm dark:text-slate-400 text-slate-500">
              Drop mission here
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  )
}

const Projects = () => {
  const [board, setBoard] = useState<Record<ColumnKey, Task[]>>(initialBoard)
  const [newTask, setNewTask] = useState({ title: '', owner: '', column: 'backlog' as ColumnKey })
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 10 },
    }),
  )

  const taskLookup = useMemo(() => {
    const map = new Map<string, ColumnKey>()
    ;(Object.keys(board) as ColumnKey[]).forEach(column => {
      board[column].forEach(task => {
        map.set(task.id, column)
      })
    })
    return map
  }, [board])

  const handleDragStart = (event: DragStartEvent) => {
    const taskId = event.active.id as string
    const columnKey = taskLookup.get(taskId)
    if (!columnKey) return
    const task = board[columnKey].find(item => item.id === taskId)
    if (task) {
      setActiveTask(task)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveTask(null)
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    const sourceColumn = taskLookup.get(activeId)
    let targetColumn = taskLookup.get(overId)

    if (!sourceColumn) return

    if (!targetColumn) {
      const asColumn = (Object.keys(board) as ColumnKey[]).find(column => column === overId)
      if (asColumn) {
        targetColumn = asColumn
      }
    }

    if (!targetColumn) return

    if (sourceColumn === targetColumn) {
      if (activeId === overId) return
      const columnTasks = board[sourceColumn]
      const oldIndex = columnTasks.findIndex(task => task.id === activeId)
      const newIndex = columnTasks.findIndex(task => task.id === overId)
      if (oldIndex === -1 || newIndex === -1) return

      setBoard(prev => ({
        ...prev,
        [sourceColumn]: arrayMove(prev[sourceColumn], oldIndex, newIndex),
      }))
      return
    }

    const movingTask = board[sourceColumn].find(task => task.id === activeId)
    if (!movingTask) return

    setBoard(prev => {
      const updated: Record<ColumnKey, Task[]> = {
        ...prev,
        [sourceColumn]: prev[sourceColumn].filter(task => task.id !== activeId),
      }

      const targetList = [...prev[targetColumn!]]
      const overIndex = targetList.findIndex(task => task.id === overId)
      const insertIndex = overIndex >= 0 ? overIndex : targetList.length

      targetList.splice(insertIndex, 0, { ...movingTask, column: targetColumn! })
      updated[targetColumn!] = targetList
      return updated
    })
  }

  const handleCreateTask = () => {
    if (!newTask.title.trim() || !newTask.owner.trim()) {
      return
    }

    const task: Task = {
      id: generateTaskId(),
      title: newTask.title.trim(),
      owner: newTask.owner.trim(),
      tag: 'Quick Add',
      eta: 'Unassigned',
      column: newTask.column,
    }

    setBoard(prev => ({
      ...prev,
      [newTask.column]: [...prev[newTask.column], task],
    }))

    setNewTask({ title: '', owner: '', column: 'backlog' })
  }

  return (
    <section className="relative flex flex-col gap-8 dark:text-slate-100 text-slate-900">
      <div className="fade-in-up flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] dark:text-slate-400 text-slate-500">Pipeline</p>
          <h2 className="text-3xl font-semibold dark:text-white text-slate-900 sm:text-4xl">Mission Control Kanban</h2>
          <p className="mt-2 max-w-2xl text-sm dark:text-slate-300 text-slate-600">
            Monitor every deliverable from discovery to launch. Drag and drop tasks to rebalance teams and sustain a frictionless launch cadence.
          </p>
        </div>
        <div className="rounded-[24px] border dark:border-white/10 border-slate-200 dark:bg-white/5 bg-slate-50 px-5 py-4 text-sm dark:text-slate-200 text-slate-700 shadow-lg shadow-sky-500/20">
          <p className="text-xs uppercase tracking-[0.35em] dark:text-slate-400 text-slate-500">Momentum</p>
          <p className="mt-2 text-lg font-semibold dark:text-white text-slate-900">72% cycle efficiency</p>
        </div>
      </div>

      <div className="fade-in-delayed glass-panel rounded-[28px] border border-white/10 p-6">
        <div className="grid gap-4 sm:grid-cols-5">
          <input
            type="text"
            value={newTask.title}
            onChange={event => setNewTask(prev => ({ ...prev, title: event.target.value }))}
            placeholder="Task headline"
            className="sm:col-span-2 rounded-2xl border dark:border-white/10 border-slate-200 dark:bg-white/5 bg-slate-50 px-4 py-2 text-sm dark:text-slate-100 text-slate-900 dark:placeholder:text-slate-400 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
          />
          <input
            type="text"
            value={newTask.owner}
            onChange={event => setNewTask(prev => ({ ...prev, owner: event.target.value }))}
            placeholder="Owner"
            className="rounded-2xl border dark:border-white/10 border-slate-200 dark:bg-white/5 bg-slate-50 px-4 py-2 text-sm dark:text-slate-100 text-slate-900 dark:placeholder:text-slate-400 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
          />
          <select
            value={newTask.column}
            onChange={event => setNewTask(prev => ({ ...prev, column: event.target.value as ColumnKey }))}
            className="rounded-2xl border dark:border-white/10 border-slate-200 dark:bg-white/5 bg-slate-50 px-4 py-2 text-sm dark:text-slate-100 text-slate-900 focus:border-sky-400 focus:outline-none"
          >
            {(Object.keys(columnConfig) as ColumnKey[]).map(key => (
              <option key={key} value={key}>
                {columnConfig[key].title}
              </option>
            ))}
          </select>
          <button onClick={handleCreateTask} className="glass-button rounded-2xl px-4 py-2 text-sm font-semibold text-white">
            Add To Board
          </button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <div className="fade-in-slow grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {(Object.keys(board) as ColumnKey[]).map(columnKey => (
            <Column key={columnKey} columnKey={columnKey} tasks={board[columnKey]}>
              {board[columnKey].map(task => (
                <KanbanCard key={task.id} task={task} />
              ))}
            </Column>
          ))}
        </div>
      </DndContext>

      {activeTask && (
        <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
          <div className="w-80 scale-105 rounded-[30px] border dark:border-white/10 border-slate-200 dark:bg-white/10 bg-slate-50 p-6 dark:text-white text-slate-900 shadow-[0_30px_45px_-35px_rgba(59,130,246,0.95)]">
            <p className="text-xs uppercase tracking-[0.35em] dark:text-slate-200 text-slate-600">{activeTask.tag}</p>
            <h4 className="mt-3 text-lg font-semibold leading-snug">{activeTask.title}</h4>
            <p className="mt-2 text-sm dark:text-slate-200/85 text-slate-600">Assigned to {activeTask.owner}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects
