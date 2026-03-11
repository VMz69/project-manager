/**
 * RESPONSABLE: Victor
 *
 * Este archivo simula una base de datos de usuarios.
 *
 * Aquí se define un array de usuarios iniciales.
 *
 * Este archivo será utilizado por:
 * authService.ts
 */

import { User } from "../types/User"

export const users: User[] = [
  {
    id: 1,
    name: "Admin",
    email: "admin@test.com",
    password: "1234",
    role: "manager"
  },
  {
    id: 2,
    name: "User",
    email: "user@test.com",
    password: "1234",
    role: "user"
  }
]