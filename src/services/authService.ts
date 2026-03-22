/**
 * RESPONSABLE: Milton
 *
 * Este archivo contiene la lógica de autenticación.
 *
 * Debe implementar:
 *
 * loginUser(email,password)
 * registerUser(user)
 *
 * loginUser:
 * buscar usuario en mocks/users
 *
 * registerUser:
 * agregar usuario al array
 */


//////////////////////////////// CODIGO DE PRUEBA... DEJO COMO APOYO

/* import { users } from "../mocks/users"

export const loginUser = (email: string, password: string) => {
  return users.find(
    (u) => u.email === email && u.password === password
  )
}

export const registerUser = (user: any) => {
  users.push(user)
}

*/

//////////////////////////////// FIN DE CODIGO DE PRUEBA... 


import { users } from "@/mocks/users";
import { User } from "@/types/User";

// Simula delay de API
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// LOGIN
export const login = async (email: string, password: string): Promise<User | null> => {
  await delay(300);

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  return user || null;
};

// REGISTER
export const register = async (newUser: Omit<User, "id">): Promise<User> => {
  await delay(300);

  const user: User = {
    id: users.length + 1,
    ...newUser,
  };

  users.push(user);

  return user;
};



