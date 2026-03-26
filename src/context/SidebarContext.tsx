// Este archivo crea un contexto global para manejar el estado del sidebar.
// Permite compartir el estado de apertura/cierre del sidebar entre componentes,
// como el Navbar (que tiene el botón toggle) y el Sidebar (que responde al estado).

'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// Interfaz que define el tipo de datos que proporciona el contexto
interface SidebarContextType {
  isOpen: boolean; // Indica si el sidebar está abierto
  toggle: () => void; // Función para alternar el estado de apertura
}

// Crea el contexto, inicialmente undefined para detectar uso fuera del provider
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Componente Provider que envuelve la app y proporciona el estado del sidebar
export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  // Estado local para controlar si el sidebar está abierto (inicialmente cerrado)
  const [isOpen, setIsOpen] = useState(false);
  // Función para alternar el estado
  const toggle = () => setIsOpen(!isOpen);

  // Proporciona el estado y la función a los componentes hijos
  return (
    <SidebarContext.Provider value={{ isOpen, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Hook personalizado para acceder al contexto del sidebar
// Lanza error si se usa fuera del SidebarProvider
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider');
  }
  return context;
};