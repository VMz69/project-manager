/**
 * RESPONSABLE: Milton
 *
 * Página de inicio de sesión.
 *
 * Debe tener:
 * - input email
 * - input password
 * - botón login
 *
 * Al enviar el formulario:
 * llamar loginUser()
 *
 * Si login correcto:
 * guardar sesión con AuthContext
 * redirigir a /dashboard
 */


/*

//// CODIGO DE PRUEBA(DEJO COMO APOYO)

"use client"

export default function LoginPage() {
  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">Login</h1>

      {//aquí debe ir el formulario}
      
    </div>
  )
}

*/


"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login, user } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Si ya está logueado, redirige
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await login(email, password);

    if (!success) {
      setError("Credenciales incorrectas");
      return;
    }

    router.push("/dashboard");
  };

  return (
    // Contenedor centralizado con fondo claro y texto oscuro para uniformidad de estilo
    <div className="flex items-center justify-center h-screen bg-white text-gray-900">
      <form onSubmit={handleSubmit} className="p-6 border border-gray-200 rounded-lg shadow-sm w-80 bg-white">
        {/* Título del formulario */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 mt-2 rounded transition-colors duration-200">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
