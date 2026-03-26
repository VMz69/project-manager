/**
 * RESPONSABLE: Eduardo
 *
 * CRUD de proyectos.
 *
 * Debe implementar:
 *
 * getProjects()
 * createProject()
 * deleteProject()
 *
 * Debe usar mocks/projects.ts
 */

/*
CODIGO DE PRUEBA(DEJO COMO APOYO)

import { projects } from "../mocks/projects"

export const getProjects = () => {
  return projects
}

export const createProject = (project: any) => {
  projects.push(project)
}

export const deleteProject = (id: number) => {
  const index = projects.findIndex((p) => p.id === id)
  projects.splice(index, 1)
}
*/
import { projects } from "../mocks/projects";
import { Project } from "../types/Project";

// Simula delay de API (como si fuera una llamada real)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simula fetch para GET /api/projects
export const getProjects = async (): Promise<Project[]> => {
  // Simula llamada fetch
  await delay(300); // Simula latencia de red
  return [...projects]; // Retorna copia de los datos locales
};

// Simula fetch para POST /api/projects
export const createProject = async (projectData: Omit<Project, 'id'>): Promise<Project> => {
  await delay(300);
  const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
  const newProject: Project = {
    ...projectData,
    id: newId
  };
  
  projects.push(newProject);
  return newProject;
};

// Simula fetch para PATCH /api/projects/:id
export const updateProject = async (id: number, projectData: Partial<Omit<Project, 'id'>>): Promise<Project> => {
  await delay(300);
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) {
    throw new Error(`Proyecto no encontrado: ${id}`);
  }
  
  const updatedProject: Project = {
    ...projects[index],
    ...projectData
  };
  
  projects[index] = updatedProject;
  return updatedProject;
};

// Simula fetch para DELETE /api/projects/:id
export const deleteProject = async (id: number): Promise<void> => {
  await delay(300);
  const index = projects.findIndex((p) => p.id === id);
  if (index !== -1) {
    projects.splice(index, 1);
  }
};