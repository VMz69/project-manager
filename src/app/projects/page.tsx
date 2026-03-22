/**
 * RESPONSABLE: Eduardo
 *
 * Página que muestra la lista de proyectos.
 *
 * Debe:
 * cargar proyectos
 * mostrarlos usando ProjectCard
 *
 * También debe permitir crear proyectos
 * si el usuario es manager.
 */

/*CODIGO DE PRUEBA(DEJO COMO APOYO)
"use client"

export default function ProjectsPage() {
  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">Projects</h1>
    </div>
  )
}
*/
"use client";

import { useState, useEffect } from "react";
import { getProjects, createProject } from "../../services/projectService";
import { Project } from "../../types/Project";
import ProjectCard from "../../components/ProjectCard";
import { useAuth } from "../../context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const isManager = user?.role === "manager";

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim() || !user?.id) return;

    createProject({
      name,
      description,
      ownerId: user.id,
    });

    setName("");
    setDescription("");
    setProjects(getProjects());
  };

  return (
    <ProtectedRoute>
      <div className="max-w-5xl mx-auto p-6">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Proyectos
          </h1>
          <p className="text-slate-500 mt-2">
            Bienvenido, {user?.name || "Invitado"}.
          </p>
        </header>

        {isManager ? (
          <section className="mb-12 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h2 className="text-sm font-bold text-slate-400 uppercase mb-4">
              Nuevo Proyecto (Panel Manager)
            </h2>
            <form
              onSubmit={handleCreate}
              className="flex flex-col md:flex-row gap-3"
            >
              <input
                className="flex-1 p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Nombre del proyecto"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className="flex-1 p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Descripción corta"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all"
              >
                Añadir
              </button>
            </form>
          </section>
        ) : (
          <div className="mb-12 p-4 bg-blue-50 text-blue-700 text-sm rounded-xl border border-blue-100 italic">
            * Tu cuenta no tiene permisos de Manager para crear nuevos
            proyectos.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                onProjectDeleted={() => setProjects(getProjects())}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-slate-400 py-10">
              No hay proyectos para mostrar.
            </p>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
