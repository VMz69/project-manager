/**
 * RESPONSABLE: Victor (Coordinador)
 *
 * Este archivo define el MODELO de usuario del sistema.
 * Aquí solo se define la estructura del objeto User.
 * No debe haber lógica aquí.
 *
 * Este tipo será utilizado en:
 * - AuthContext
 * - authService
 * - mocks/users
 *
 * Campos requeridos:
 * id        → identificador del usuario
 * name      → nombre del usuario
 * email     → correo
 * password  → contraseña
 * role      → tipo de usuario
 *
 * Los roles permitidos deben ser:
 * "manager" → administrador del sistema
 * "user"    → usuario normal
 */

export interface User {
  id: number
  name: string
  email: string
  password: string
  role: "manager" | "user"
}