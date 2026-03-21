/**
 * RESPONSABLE: Victor
 *
 * Simula la base de datos de tareas.
 *
 * Este array será utilizado por:
 * taskService.ts
 */



import { Task } from "../types/Task"

export const tasks: Task[] = [
  {
    id: 1,
    title: "Crear interfaz",
    projectId: 1,
    assignedTo: 2,
    status: "pending"
  }
]
