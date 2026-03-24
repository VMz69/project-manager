

import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="text-center px-6 py-12 max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Bienvenido a Project Manager!
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Gestiona tus proyectos y tareas de manera eficiente.
        </p>
        <div className="space-y-4">
          <Link href="/login" className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
            Iniciar Sesión
          </Link>
          <Link href="/register" className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
            Registrarse
          </Link>
        </div>
      </main>
    </div>
  );
}
