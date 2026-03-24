'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  // para que no salga la sidebar en las páginas login/register/home
  if (pathname === '/login' || pathname === '/register' || pathname === '/') {
    return null;
  }

  const btn = (path: string) =>
    `w-full text-left px-3 py-2 rounded transition
     ${
       pathname === path
         ? 'bg-white text-blue-700 font-semibold'
         : 'hover:bg-blue-700'
     }`;

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <>
      {/* Botón hamburguesa para móvil */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay para móvil */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
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
          <button onClick={() => { router.push('/dashboard'); setIsOpen(false); }} className={btn('/dashboard')}>
            Inicio
          </button>

          <button onClick={() => { router.push('/projects'); setIsOpen(false); }} className={btn('/projects')}>
            Proyectos
          </button>

          <button onClick={() => { router.push('/tasks'); setIsOpen(false); }} className={btn('/tasks')}>
            Tareas
          </button>
        </nav>

        {/* Información de usuario + logout */}
        <div className="mt-4 border-t border-white/30 pt-4 md:mt-auto">
          <p className="text-sm text-white/90">Conectado como:</p>
          <p className="font-semibold truncate text-white">{user?.name ?? 'Invitado'}</p>
          <button
            onClick={() => { handleLogout(); setIsOpen(false); }}
            className="mt-2 w-full bg-white text-blue-700 font-semibold py-2 rounded hover:bg-gray-100 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
}
