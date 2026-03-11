/**
 * RESPONSABLE: Victor
 *
 * Este archivo maneja la sesión global del usuario.
 *
 * Debe proporcionar:
 * - user
 * - login()
 * - logout()
 *
 * También debe guardar la sesión en localStorage.
 */
"use client"

import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext<any>(null)

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null)

  // cargar usuario guardado al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = (user: any) => {
    localStorage.setItem("user", JSON.stringify(user))
    setUser(user)
  }

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)