/**
 * RESPONSABLE: William
 *
 * Barra de navegación principal (top bar).
 *
 * Incluye:
 * - Botón hamburguesa para toggle sidebar (izquierda)
 * - Rol del usuario, icono de usuario, botón logout (derecha)
 */

'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useSidebar } from '@/context/SidebarContext';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { toggle } = useSidebar();

  // No mostrar navbar en páginas públicas
  if (pathname === '/login' || pathname === '/register' || pathname === '/') {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-blue-50 shadow-md px-4 py-3 flex items-center justify-end">
      {/* Izquierda: Botón hamburguesa (solo visible en móvil) */}
      <button
        onClick={toggle}
        className="md:hidden mr-auto p-2 rounded hover:bg-gray-100 transition"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Derecha: Rol, icono usuario, logout */}
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600 capitalize">{user?.role ?? 'Usuario'}</span>
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}