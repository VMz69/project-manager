'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useSidebar } from '@/context/SidebarContext';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { isOpen, toggle } = useSidebar();

  // para que no salga la sidebar en páginas que no sean dashboard, projects, tasks (incluyendo 404s)
  const allowedPaths = ['/dashboard', '/projects', '/tasks'];
  if (!allowedPaths.includes(pathname)) {
    return null;
  }

  const btn = (path: string) =>
    `w-full text-left px-3 py-2 rounded transition
     ${
       pathname === path
         ? 'bg-white text-blue-700 font-semibold'
         : 'hover:bg-blue-700'
     }`;

  // const handleLogout = () => {
  //   logout();
  //   router.push('/login');
  // };

  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggle}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-blue-600 to-blue-400 text-white flex flex-col p-6 transform transition-transform md:translate-x-0 md:static md:inset-0 md:w-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Navegación principal */}
        <nav className="flex-1 space-y-2">
          <button onClick={() => { router.push('/dashboard'); toggle(); }} className={btn('/dashboard')}>
            Inicio
          </button>

          <button onClick={() => { router.push('/projects'); toggle(); }} className={btn('/projects')}>
            Proyectos
          </button>

          <button onClick={() => { router.push('/tasks'); toggle(); }} className={btn('/tasks')}>
            Tareas
          </button>
        </nav>

        {/* Información de usuario */}
        <div className="mt-4 border-t border-white/30 pt-4 md:mt-auto">
          <p className="text-sm text-white/90">Conectado como:</p>
          <p className="font-semibold truncate text-white">{user?.name ?? 'Invitado'}</p>
          <p className="font-light truncate text-white">{user?.role ?? ''}</p>
          <p className="font-light truncate text-white">{user?.email ?? ''}</p>

        </div>
      </aside>
    </>
  );
}
