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

import { useState } from 'react';
import { Project } from "../types/Project";
import { deleteProject, updateProject } from "../services/projectService";

interface ProjectCardProps {
  project: Project;
  onProjectDeleted: () => Promise<void>;
  isManager: boolean;
  onProjectUpdated: (updated: Project) => Promise<void>;
}

export default function ProjectCard({ project, onProjectDeleted, isManager, onProjectUpdated }: ProjectCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(project.name);
  const [editDescription, setEditDescription] = useState(project.description);

  const handleDelete = async () => {
    if (window.confirm(`¿Seguro que deseas eliminar "${project.name}"?`)) {
      await deleteProject(project.id);
      await onProjectDeleted();
    }
  };

  const handleSaveEdit = async () => {
    if (!editName.trim() || !editDescription.trim()) {
      alert('El nombre y descripción no pueden estar vacíos');
      return;
    }

    try {
      const updated = await updateProject(project.id, {
        name: editName,
        description: editDescription,
      });
      await onProjectUpdated(updated);
      setIsEditing(false);
    } catch (err) {
      console.error("Error al actualizar proyecto:", err);
      alert("Error al actualizar el proyecto");
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1">Nombre</label>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600 block mb-1">Descripción</label>
          <input
            type="text"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex gap-2 pt-2">
          <button
            onClick={handleSaveEdit}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
          >
            Guardar
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setEditName(project.name);
              setEditDescription(project.description);
            }}
            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

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
        <div className="flex gap-2">
          {isManager && (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="text-xs text-blue-500 font-semibold hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                Editar
              </button>
              <button 
                onClick={handleDelete}
                className="text-xs text-red-500 font-semibold hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                Eliminar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}