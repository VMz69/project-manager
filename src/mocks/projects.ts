/**
 * RESPONSABLE: Victor
 *
 * Simula la base de datos de proyectos.
 *
 * Este array será utilizado por:
 * projectService.ts
 */

import { Project } from "../types/Project"

export const projects: Project[] = [
  {
    id: 1,
    name: "Proyecto Demo",
    description: "Proyecto de ejemplo",
    ownerId: 1
  }
]