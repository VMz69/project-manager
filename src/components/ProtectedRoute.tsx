/**
 * RESPONSABLE: Victor
 *
 * Este componente protege rutas privadas.
 *
 * Debe verificar si hay usuario logueado.
 *
 * Si no hay usuario:
 * mostrar mensaje "No autorizado".
 *
 * Si hay usuario:
 * mostrar children.
 */

"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Si no hay usuario, redirige a login
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  // Evita render mientras valida
  if (!user) return null;

  return <>{children}</>;
}