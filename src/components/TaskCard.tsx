/**
 * RESPONSABLE: Fernando
 *
 * Componente visual de una tarea.
 *
 * Debe mostrar:
 * título
 * estado
 *
 * Debe permitir cambiar el estado.
 */

"use client"

import { Task } from "@/types/Task"
import { User } from "@/types/User"
import { TaskStatus } from "@/services/taskService"

interface TaskCardProps {
  task: Task
  currentUser: User | null
  onStatusChange: (id: number, newStatus: TaskStatus) => void
}

/** Mapa de cada estado al siguiente paso en el flujo de trabajo. */
const nextStatus: Record<TaskStatus, TaskStatus | null> = {
  "pending":     "in-progress",
  "in-progress": "done",
  "done":        null,
}

/** Configuración visual por estado. */
const statusConfig: Record<TaskStatus, { label: string; border: string; badge: string; dot: string }> = {
  "pending": {
    label: "Pendiente",
    border: "border-l-amber-400",
    badge: "bg-amber-400/10 text-amber-300 border border-amber-400/20",
    dot: "bg-amber-400",
  },
  "in-progress": {
    label: "En progreso",
    border: "border-l-sky-400",
    badge: "bg-sky-400/10 text-sky-300 border border-sky-400/20",
    dot: "bg-sky-400",
  },
  "done": {
    label: "Completada",
    border: "border-l-emerald-400",
    badge: "bg-emerald-400/10 text-emerald-300 border border-emerald-400/20",
    dot: "bg-emerald-400",
  },
}

/**
 * Muestra una tarjeta de tarea con una insignia de estado con código de color
 * y un botón según el rol para avanzar el estado un paso.
 */
export default function TaskCard({ task, currentUser, onStatusChange }: TaskCardProps) {
  const canChange = currentUser?.role === "manager" || (currentUser?.role === "user" && currentUser?.id === task.assignedTo)

  const next = nextStatus[task.status]
  const config = statusConfig[task.status]

  return (
    <div
      className={`
        group relative bg-white border border-gray-300 border-l-4 ${config.border}
        rounded-xl p-5 flex flex-col gap-4
        hover:border-gray-400 hover:bg-gray-50
        transition-all duration-200
      `}
    >
      {/* Encabezado con título y badge de estado */}
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-sm font-semibold text-gray-900 leading-snug tracking-tight">
          {task.title}
        </h2>
        <span className={`shrink-0 flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${config.badge}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
          {config.label}
        </span>
      </div>

      {/* Metadata con info de proyecto y usuario */}
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
          </svg>
          Proyecto #{task.projectId}
        </span>
        <span className="text-gray-400">·</span>
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Usuario #{task.assignedTo}
        </span>
      </div>

      {/* Botón de avance de estado, solo si permitido */}
      {canChange && next !== null ? (
        <button
          onClick={() => onStatusChange(task.id, next)}
          className="
            mt-auto w-full text-xs font-medium text-gray-600
            border border-gray-300 hover:border-amber-400/50
            hover:text-amber-600 hover:bg-amber-50
            rounded-lg py-2 transition-all duration-200
          "
        >
          Avanzar estado
        </button>
      ) : (
        <div className="mt-auto" />
      )}
    </div>
  )
}
