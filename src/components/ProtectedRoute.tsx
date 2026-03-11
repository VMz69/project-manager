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

"use client"

import { useAuth } from "../context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProtectedRoute({ children }: any) {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return <div>Cargando...</div>
  }

  return children
}