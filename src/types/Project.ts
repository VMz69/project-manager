/**
 * RESPONSABLE: Victor
 *
 * Modelo de datos para un proyecto.
 *
 * Este tipo describe cómo se representa un proyecto
 * dentro del sistema.
 *
 * Campos:
 * id          → identificador del proyecto
 * name        → nombre del proyecto
 * description → descripción
 * ownerId     → id del usuario que creó el proyecto
 */

export interface Project {
  id: number
  name: string
  description: string
  ownerId: number
}