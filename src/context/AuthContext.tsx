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

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types/User";
import * as authService from "@/services/authService";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: Omit<User, "id">) => Promise<boolean>;
  logout: () => void;
}

// Crear contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Cargar sesión desde localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // LOGIN
  const login = async (email: string, password: string) => {
    const user = await authService.login(email, password);

    if (!user) return false;

    setUser(user);

    // Guardar sesión
    localStorage.setItem("user", JSON.stringify(user));

    return true;
  };

  // REGISTER
  const register = async (data: Omit<User, "id">) => {
    const user = await authService.register(data);

    setUser(user);

    localStorage.setItem("user", JSON.stringify(user));

    return true;
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};