import './globals.css';
import { AuthProvider } from "@/context/AuthContext";
import Sidebar from '@/components/Sidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="flex min-h-screen">
        <AuthProvider>
          {children}
        </AuthProvider>
        {/* <Sidebar />
        <main className="flex-1 bg-blue-50 p-8">
          {children}
        </main> */}
      </body>
    </html>
  );
}