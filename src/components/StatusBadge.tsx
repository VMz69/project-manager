type Status = 'pending' | 'in_progress' | 'done';

export default function StatusBadge({ status }: { status: Status }) {
  const styles = {
    pending: 'bg-yellow-100 text-yellow-800 ring-yellow-200',
    in_progress: 'bg-blue-100 text-blue-800 ring-blue-200',
    done: 'bg-green-100 text-green-800 ring-green-200',
  };

  const labels = {
    pending: 'Pendiente',
    in_progress: 'En progreso',
    done: 'Completada',
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
