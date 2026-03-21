/**
 * RESPONSABLE: Fernando
 *
 * Página de tareas.
 *
 * Debe:
 * cargar tareas
 * mostrarlas usando TaskCard
 *
 * Si el usuario es normal:
 * mostrar solo tareas asignadas a él.
 */

"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import TaskCard from "@/components/TaskCard"
import ProtectedRoute from "@/components/ProtectedRoute"
import { getTasks, createTask, updateTask, TaskStatus } from "@/services/taskService"
import { Task } from "@/types/Task"
import { User } from "@/types/User"

/**
 * Página protegida que muestra todas las tareas en un grid responsivo.
 * Los gerentes ven todas las tareas y un formulario de creación.
 * Los usuarios normales solo ven las tareas asignadas a ellos.
 */
export default function TasksPage() {
  const { user } = useAuth()
  const currentUser = user as User | null
  const isManager = currentUser?.role === "manager"

  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  // Estado del formulario de creación
  const [formTitle, setFormTitle] = useState("")
  const [formProjectId, setFormProjectId] = useState("")
  const [formAssignedTo, setFormAssignedTo] = useState("")

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  // Los gerentes ven todas las tareas, los usuarios normales solo las propias
  const visibleTasks = isManager
    ? tasks
    : tasks.filter((t) => t.assignedTo === currentUser?.id)

  const countByStatus = (s: TaskStatus) => tasks.filter((t) => t.status === s).length

  const handleStatusChange = async (id: number, newStatus: TaskStatus) => {
    try {
      const updated = await updateTask(id, { status: newStatus })
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
    } catch (err) {
      console.error("handleStatusChange falló:", err)
    }
  }

  const handleCreate = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (
      !formTitle ||
      formProjectId === "" ||
      formAssignedTo === "" ||
      isNaN(Number(formProjectId)) ||
      isNaN(Number(formAssignedTo))
    ) return

    try {
      const newTask = await createTask({
        title: formTitle,
        projectId: Number(formProjectId),
        assignedTo: Number(formAssignedTo),
        status: "pending",
      })
      setTasks((prev) => [...prev, newTask])
      setFormTitle("")
      setFormProjectId("")
      setFormAssignedTo("")
      setShowForm(false)
    } catch (err) {
      console.error("handleCreate falló:", err)
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-zinc-950 text-zinc-100">

      {/* Header fijo */}
      <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-semibold tracking-tight text-zinc-100">
              Tareas
            </h1>
            <span className="text-zinc-700 text-xs">|</span>
            <span className="text-xs text-zinc-500">{visibleTasks.length} total</span>
          </div>

          {isManager && (
            <button
              onClick={() => setShowForm((v) => !v)}
              className={`
                flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg
                transition-all duration-200
                ${showForm
                  ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                  : "bg-amber-400 text-zinc-950 hover:bg-amber-300"
                }
              `}
            >
              <span className="text-base leading-none">{showForm ? "×" : "+"}</span>
              {showForm ? "Cancelar" : "Nueva tarea"}
            </button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Pendientes", count: countByStatus("pending"), color: "text-amber-400", bar: "bg-amber-400" },
            { label: "En progreso", count: countByStatus("in-progress"), color: "text-sky-400", bar: "bg-sky-400"   },
            { label: "Completadas", count: countByStatus("done"), color: "text-emerald-400", bar: "bg-emerald-400" },
          ].map(({ label, count, color, bar }) => (
            <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
              <div className={`text-3xl font-bold tabular-nums ${color}`}>{count}</div>
              <div className="space-y-1.5">
                <p className="text-xs text-zinc-500 uppercase tracking-widest">{label}</p>
                <div className="h-0.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${bar} rounded-full transition-all duration-500`}
                    style={{ width: tasks.length ? `${(count / tasks.length) * 100}%` : "0%" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Formulario de creación — solo gerentes */}
        {isManager && showForm && (
          <form
            onSubmit={handleCreate}
            className="bg-zinc-900 border border-zinc-700 border-l-4 border-l-amber-400 rounded-xl p-6 space-y-4"
          >
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
              Nueva tarea
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Título *"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                required
                className="
                  bg-zinc-800 border border-zinc-700 text-zinc-100
                  placeholder-zinc-500 rounded-lg px-3 py-2.5 text-sm
                  focus:outline-none focus:border-amber-400/60 focus:bg-zinc-700/50
                  transition-all duration-200
                "
              />
              <input
                type="number"
                placeholder="ID de proyecto *"
                value={formProjectId}
                onChange={(e) => setFormProjectId(e.target.value)}
                required
                min={1}
                className="
                  bg-zinc-800 border border-zinc-700 text-zinc-100
                  placeholder-zinc-500 rounded-lg px-3 py-2.5 text-sm
                  focus:outline-none focus:border-amber-400/60 focus:bg-zinc-700/50
                  transition-all duration-200
                "
              />
              <input
                type="number"
                placeholder="ID de usuario *"
                value={formAssignedTo}
                onChange={(e) => setFormAssignedTo(e.target.value)}
                required
                min={1}
                className="
                  bg-zinc-800 border border-zinc-700 text-zinc-100
                  placeholder-zinc-500 rounded-lg px-3 py-2.5 text-sm
                  focus:outline-none focus:border-amber-400/60 focus:bg-zinc-700/50
                  transition-all duration-200
                "
              />
            </div>
            <button
              type="submit"
              className="bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold text-sm px-5 py-2 rounded-lg transition-colors duration-200"
            >
              Crear tarea
            </button>
          </form>
        )}

        {/* Lista de tareas */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="flex items-center gap-2 text-zinc-600 text-sm">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Cargando...
            </div>
          </div>
        ) : visibleTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <svg className="w-5 h-5 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-zinc-600 text-sm">No hay tareas</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                currentUser={currentUser}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}

      </main>
      </div>
    </ProtectedRoute>
  )
}