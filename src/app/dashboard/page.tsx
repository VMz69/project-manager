/**
 * RESPONSABLE: William
 *
 * Página principal después del login.
 *
 * Debe mostrar un resumen del sistema:
 *
 * número de proyectos
 * número de tareas
 * tareas pendientes
 */

'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';

type Project = {
  id: string;
  name: string;
  status: 'active' | 'archived';
};

type Task = {
  id: string;
  title: string;
  projectId: string;
  status: 'pending' | 'in_progress' | 'done';
  dueDate?: string; // ISO
};

/* =========================
   estos datos compañeros son inventados debemos reemplazarlos por lo reales
   ========================= */
const projectsMock: Project[] = [
  { id: 'p1', name: 'Rediseño web', status: 'active' },
  { id: 'p2', name: 'App móvil', status: 'active' },
  { id: 'p3', name: 'Onboarding interno', status: 'archived' },
];

const tasksMock: Task[] = [
  { id: 't1', title: 'Wireframes landing', projectId: 'p1', status: 'pending',    dueDate: '2026-03-20' },
  { id: 't2', title: 'Configurar CI/CD',   projectId: 'p1', status: 'in_progress', dueDate: '2026-03-22' },
  { id: 't3', title: 'Definir API auth',   projectId: 'p2', status: 'pending',     dueDate: '2026-03-21' },
  { id: 't4', title: 'QA flujo de pagos',  projectId: 'p2', status: 'done' },
  { id: 't5', title: 'Guía de estilos',    projectId: 'p1', status: 'pending' },
];

export default function DashboardPage() {
  const router = useRouter();

  // KPIs + lista de pendientes ordenada por fecha
  const { totalProjects, totalTasks, pendingTasks } = useMemo(() => {
    const totalProjects = projectsMock.length;
    const totalTasks = tasksMock.length;
    const pendingTasks = tasksMock
      .filter(t => t.status === 'pending')
      .sort((a, b) => {
        const da = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
        const db = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
        return da - db;
      });
    return { totalProjects, totalTasks, pendingTasks };
  }, []);

  const projectName = (projectId: string) =>
    projectsMock.find(p => p.id === projectId)?.name ?? 'Proyecto';

  const badgeClass = (status: Task['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 ring-yellow-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 ring-blue-200';
      case 'done':
        return 'bg-green-100 text-green-800 ring-green-200';
    }
  };

  const label = (status: Task['status']) =>
    status === 'pending' ? 'Pendiente' :
    status === 'in_progress' ? 'En progreso' : 'Completada';

  const formatDate = (iso?: string) => {
    if (!iso) return '—';
    const d = new Date(iso);
    return d.toLocaleDateString('es-SV', { year: 'numeric', month: 'short', day: '2-digit' });
  };

  // Salir: limpia "sesión" local y lleva a /login (cuando lo definas)
  const handleLogout = () => {
    try {
      localStorage.removeItem('auth:user');
    } catch {
      // ignora errores de localStorage
    }
    router.replace('/login');
  };

  return (
    <section className="space-y-8">
      {/* Encabezado + acciones */}
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Resumen general del sistema</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Ejemplo de accesos rápidos; puedes quitarlos si tendrás Navbar */}
          <button
            onClick={() => router.push('/projects')}
            className="hidden sm:inline-flex rounded-md bg-white px-3 py-2 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-200 hover:bg-blue-50"
          >
            Ver proyectos
          </button>
          <button
            onClick={() => router.push('/tasks')}
            className="hidden sm:inline-flex rounded-md bg-white px-3 py-2 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-200 hover:bg-blue-50"
          >
            Ver tareas
          </button>

          <button
            onClick={handleLogout}
            className="inline-flex rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Salir
          </button>
        </div>
      </header>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Proyectos</p>
          <p className="mt-1 text-4xl font-extrabold text-gray-900">{totalProjects}</p>
          <p className="mt-1 text-xs text-gray-400">Totales (activos y archivados)</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Tareas</p>
          <p className="mt-1 text-4xl font-extrabold text-gray-900">{totalTasks}</p>
          <p className="mt-1 text-xs text-gray-400">Todas las tareas</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Tareas pendientes</p>
          <p className="mt-1 text-4xl font-extrabold text-gray-900">{pendingTasks.length}</p>
          <p className="mt-1 text-xs text-gray-400">Aún sin completar</p>
        </div>
      </div>

      {/* Lista de tareas pendientes */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Tareas pendientes</h2>
        </div>

        {pendingTasks.length === 0 ? (
          <div className="px-6 py-8 text-gray-500">No hay tareas pendientes </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {pendingTasks.map(task => (
              <li key={task.id} className="px-6 py-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 truncate">{task.title}</p>
                  <p className="text-sm text-gray-500 truncate">
                    Proyecto: {projectName(task.projectId)}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${badgeClass(task.status)}`}
                  >
                    {label(task.status)}
                  </span>
                  <span className="text-sm text-gray-600">
                    Vence: {formatDate(task.dueDate)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
