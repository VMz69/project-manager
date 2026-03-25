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

// Simula delay de API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simula fetch para GET /api/tasks
export async function getTasks(): Promise<Task[]> {
  try {
    await delay(300);
    return Promise.resolve([...tasks])
  } catch (err) {
    console.error("getTasks falló:", err)
    throw err
  }
}

// Simula fetch para GET /api/tasks/:id
export async function getTaskById(id: number): Promise<Task> {
  try {
    await delay(300);
    const task = tasks.find((t) => t.id === id)
    if (!task) throw new Error(`Tarea no encontrada: ${id}`)
    return Promise.resolve(task)
  } catch (err) {
    console.error("getTaskById falló:", err)
    throw err
  }
}

// Simula fetch para POST /api/tasks
export async function createTask(task: Omit<Task, "id">): Promise<Task> {
  try {
    await delay(300);
    const id = Math.max(0, ...tasks.map((t) => t.id)) + 1
    const newTask: Task = { id, ...task }
    tasks.push(newTask)
    return Promise.resolve(newTask)
  } catch (err) {
    console.error("createTask falló:", err)
    throw err
  }
}

// Simula fetch para PATCH /api/tasks/:id
export async function updateTask(id: number, data: Partial<Task>): Promise<Task> {
  try {
    await delay(300);
    const task = tasks.find((t) => t.id === id)
    if (!task) throw new Error(`Tarea no encontrada: ${id}`)
    Object.assign(task, data)
    return Promise.resolve(task)
  } catch (err) {
    console.error("updateTask falló:", err)
    throw err
  }
}

// Simula fetch para DELETE /api/tasks/:id
export async function deleteTask(id: number): Promise<void> {
  try {
    await delay(300);
    const index = tasks.findIndex((t) => t.id === id)
    if (index === -1) throw new Error(`Tarea no encontrada: ${id}`)
    tasks.splice(index, 1)
    return Promise.resolve()
  } catch (err) {
    console.error("deleteTask falló:", err)
    throw err
  }
}
