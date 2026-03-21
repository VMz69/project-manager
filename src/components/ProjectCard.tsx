/**
 * RESPONSABLE: Eduardo
 *
 * Componente que muestra un proyecto.
 *
 * Debe mostrar:
 * nombre del proyecto
 * descripcion
 *
 * Opcional:
 * botón eliminar
 */


/*
CODIGO DE PRUEBA (DEJO COMO APOYO)
export default function ProjectCard({ project }: any) {
  return (
    <div className="border p-4 rounded">
      <h2 className="font-bold">{project.name}</h2>
      <p>{project.description}</p>
    </div>
  )
}



*/

'use client';

import { Project } from "../types/Project";
import { deleteProject } from "../services/projectService";

interface ProjectCardProps {
  project: Project;
  onProjectDeleted: () => void;
}

export default function ProjectCard({ project, onProjectDeleted }: ProjectCardProps) {
  const handleDelete = () => {
    if (window.confirm(`¿Seguro que deseas eliminar "${project.name}"?`)) {
      deleteProject(project.id);
      onProjectDeleted();
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-lg text-slate-800">{project.name}</h3>
        <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500 font-mono">
          ID: {project.id}
        </span>
      </div>
      <p className="text-slate-600 text-sm mb-6 leading-relaxed">
        {project.description}
      </p>
      <div className="flex justify-between items-center pt-4 border-t border-slate-50">
        <span className="text-[10px] text-slate-400">Owner ID: {project.ownerId}</span>
        <button 
          onClick={handleDelete}
          className="text-xs text-red-500 font-semibold hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}