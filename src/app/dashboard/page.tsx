"use client";

import { useRouter } from "next/navigation";
import { projects } from "@/mocks/projects";
import { tasks } from "@/mocks/tasks";
import StatusBadge from "@/components/StatusBadge";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const router = useRouter();

  // Usamos el contexto global (forma correcta)
  const { logout, user } = useAuth();

  // Filtrar tareas pendientes
  const pending = tasks.filter((t) => t.status === "pending");

  // Obtener nombre del proyecto desde su id
  const getProjectName = (id: number) => {
    return projects.find((p) => p.id === id)?.name ?? "Proyecto";
  };

  // Logout usando contexto (NO localStorage manual)
  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <ProtectedRoute>
      <div className="space-y-8 relative">
        {/* BOTÓN SALIR */}
        <button
          onClick={handleLogout}
          className="absolute top-0 right-0 bg-white text-blue-700 px-4 py-2 rounded shadow hover:bg-blue-100 transition"
        >
          Salir
        </button>

        {/* HEADER */}
        <header>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard {user ? `- ${user.name}` : ""}
          </h1>
          <p className="text-gray-700">Resumen general del sistema</p>
        </header>

        {/* CARDS KPI */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card title="Proyectos" value={projects.length} href="/projects" />
          <Card title="Tareas" value={tasks.length} href="/tasks" />
          <Card
            title="Tareas pendientes"
            value={pending.length}
            href="/tasks"
          />
        </section>

        {/* LISTA DE TAREAS */}
        <section className="bg-white rounded-xl shadow">
          <div className="border-b px-6 py-4 font-semibold text-gray-900">
            Tareas pendientes
          </div>

          {pending.length === 0 ? (
            <p className="px-6 py-8 text-gray-600">
              No hay tareas pendientes
            </p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {pending.map((task) => (
                <li
                  key={task.id}
                  className="px-6 py-4 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {task.title}
                    </p>

                    {/* Se usa función corregida */}
                    <p className="text-sm text-gray-700">
                      Proyecto: {getProjectName(task.projectId)}
                    </p>
                  </div>

                  <StatusBadge status={task.status} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </ProtectedRoute>
  );
}

/* 
  Card reutilizable para navegación
  Se deja igual pero con comentario claro
*/
function Card({
  title,
  value,
  href,
}: {
  title: string;
  value: number;
  href: string;
}) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(href)}
      className="bg-white rounded-xl p-6 shadow cursor-pointer 
      hover:bg-blue-50 hover:scale-105 active:scale-95 transition transform"
    >
      <p className="text-sm font-medium text-gray-700">{title}</p>
      <p className="mt-2 text-4xl font-extrabold text-blue-500">
        {value}
      </p>
    </div>
  );
}