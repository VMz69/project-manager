/**
 * RESPONSABLE: Milton
 *
 * Página de registro de usuarios.
 *
 * Debe tener formulario con:
 * name
 * email
 * password
 * role
 *
 * Al enviar:
 * llamar registerUser()
 */

/*
CODIGO DE PRUEBA(DEJO COMO APOYO)

"use client"

export default function RegisterPage() {
  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">Register</h1>

      { //formulario de registro }
    </div>
  )
}

*/

"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { register, user } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"manager" | "user">("user");

  // Si ya está logueado, redirige
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await register({ name, email, password, role });

    router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="p-6 border rounded w-80">
        <h2 className="text-xl mb-4">Registro</h2>

        <input
          type="text"
          placeholder="Nombre"
          className="w-full mb-2 p-2 border"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-2 p-2 border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-2 p-2 border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="w-full mb-2 p-2 border"
          value={role}
          onChange={(e) => setRole(e.target.value as "manager" | "user")}
        >
          <option value="user">Usuario</option>
          <option value="manager">Gerente</option>
        </select>

        <button className="w-full bg-green-500 text-white p-2 mt-2">
          Registrarse
        </button>
      </form>
    </div>
  );
}