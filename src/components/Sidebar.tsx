'use client';

import { useRouter, usePathname } from 'next/navigation';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  // para que no salga la side bar en l apantalla login
  if (pathname === '/login') {
    return null;
  }

  const btn = (path: string) =>
    `w-full text-left px-3 py-2 rounded transition
     ${
       pathname === path
         ? 'bg-white text-blue-700 font-semibold'
         : 'hover:bg-blue-700'
     }`;

  return (
    <aside className="w-40 bg-gradient-to-b from-blue-600 to-blue-400 text-white flex flex-col p-6">
      <nav className="flex-1 space-y-2">
        <button onClick={() => router.push('/dashboard')} className={btn('/dashboard')}>
          Inicio
        </button>

        <button onClick={() => router.push('/projects')} className={btn('/projects')}>
          Proyectos
        </button>

        <button onClick={() => router.push('/tasks')} className={btn('/tasks')}>
          Tareas
        </button>
      </nav>
    </aside>
  );
}
