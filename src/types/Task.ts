/**
 * RESPONSABLE: Victor
 *
 * Modelo de datos para tareas.
 *
 * Campos:
 * id          → identificador
 * title       → título de la tarea
 * projectId   → proyecto al que pertenece
 * assignedTo  → usuario asignado
 * status      → estado de la tarea
 *
 * Estados permitidos:
 * pending
 * in-progress
 * done
 */

export interface Task {
  id: number
  title: string
  projectId: number
  assignedTo: number
  status: "pending" | "in-progress" | "done"
}