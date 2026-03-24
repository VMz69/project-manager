// Importa los estilos globales de la aplicación
import './globals.css';
// Importa el tipo Metadata de Next.js para definir metadatos de la página
import type {Metadata} from "next";
// Importa el AuthProvider para manejar el contexto de autenticación en toda la app
import { AuthProvider } from "@/context/AuthContext";
// Importa el SidebarProvider para manejar el estado del sidebar
import { SidebarProvider } from "@/context/SidebarContext";
// Importa el componente Sidebar para la navegación lateral
import Sidebar from '@/components/Sidebar';
// Importa el componente Navbar para la barra superior
import Navbar from '@/components/Navbar';

// Define los metadatos de la aplicación, como título y descripción
export const metadata: Metadata ={
  title: "Project Manager",
  description: "Aplicacion simple para la gestion de proyectos y tareas"
};

// Componente principal del layout raíz de la aplicación
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      {/* Body con clases de Tailwind: flex en pantallas medianas y arriba para layout responsivo */}
      <body className="md:flex">
        {/* Proveedor de contexto de sidebar que envuelve la app */}
        <SidebarProvider>
          {/* Proveedor de contexto de autenticación que envuelve toda la app */}
          <AuthProvider>
            {/* Componente Sidebar para navegación */}
            <Sidebar />
            {/* Contenedor principal que ocupa el espacio restante, con altura mínima de pantalla */}
            <main className="flex-1 min-h-screen flex flex-col">
              {/* Barra de navegación superior */}
              <Navbar />
              {/* Renderiza los children (páginas hijas) */}
              <div className="flex-1">
                {children}
              </div>
            </main>
          </AuthProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}