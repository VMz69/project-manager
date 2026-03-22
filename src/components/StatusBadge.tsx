import { TaskStatus } from "@/services/taskService";

// Tipo directo (no se necesita Task aquí)
type Status = TaskStatus;

export default function StatusBadge({ status }: { status: Status }) {
  // Estilos por estado
  const styles: Record<Status, string> = {
    "pending": "bg-yellow-100 text-yellow-800 ring-yellow-200",
    "in-progress": "bg-blue-100 text-blue-800 ring-blue-200",
    "done": "bg-green-100 text-green-800 ring-green-200",
  };

  // Labels visibles
  const labels: Record<Status, string> = {
    "pending": "Pendiente",
    "in-progress": "En progreso",
    "done": "Completada",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
