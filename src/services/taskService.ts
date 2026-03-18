/**
 * RESPONSABLE: Fernando
 *
 * Manejo de tareas.
 *
 * Debe implementar:
 *
 * getTasks()
 * updateTaskStatus()
 */

import { Task } from "@/types/Task"
import { tasks } from "@/mocks/tasks"

/* Tipo de estado de una tarea, derivado del tipo Task. */
export type TaskStatus = Task["status"]

/*
 * Retorna una copia de todas las tareas.
 */
export async function getTasks(): Promise<Task[]> {
  try {
    return Promise.resolve([...tasks])
  } catch (err) {
    console.error("getTasks falló:", err)
    throw err
  }
}

/**
 * Retorna la tarea con el id indicado.
 * @throws Error si no existe ninguna tarea con ese id.
 */
export async function getTaskById(id: number): Promise<Task> {
  try {
    const task = tasks.find((t) => t.id === id)
    if (!task) throw new Error(`Tarea no encontrada: ${id}`)
    return Promise.resolve(task)
  } catch (err) {
    console.error("getTaskById falló:", err)
    throw err
  }
}

/**
 * Crea una nueva tarea con un id generado automáticamente.
 * @param task - Todos los campos de la tarea excepto el id.
 */
export async function createTask(task: Omit<Task, "id">): Promise<Task> {
  try {
    const id = Math.max(0, ...tasks.map((t) => t.id)) + 1
    const newTask: Task = { id, ...task }
    tasks.push(newTask)
    return Promise.resolve(newTask)
  } catch (err) {
    console.error("createTask falló:", err)
    throw err
  }
}

/**
 * Aplica una actualización parcial a la tarea con el id indicado.
 * @throws Error si no existe ninguna tarea con ese id.
 */
export async function updateTask(id: number, data: Partial<Task>): Promise<Task> {
  try {
    const task = tasks.find((t) => t.id === id)
    if (!task) throw new Error(`Tarea no encontrada: ${id}`)
    Object.assign(task, data)
    return Promise.resolve(task)
  } catch (err) {
    console.error("updateTask falló:", err)
    throw err
  }
}

/**
 * Elimina la tarea con el id indicado.
 * @throws Error si no existe ninguna tarea con ese id.
 */
export async function deleteTask(id: number): Promise<void> {
  try {
    const index = tasks.findIndex((t) => t.id === id)
    if (index === -1) throw new Error(`Tarea no encontrada: ${id}`)
    tasks.splice(index, 1)
    return Promise.resolve()
  } catch (err) {
    console.error("deleteTask falló:", err)
    throw err
  }
}
