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

// Simula delay de API (como si fuera el tiempo de respuesta de un fetch real)
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Simula fetch para GET /api/users
export const getUsers = async (): Promise<User[]> => {
  await delay(300);
  return [...users];
};

// Simula fetch para POST /api/login
export const login = async (email: string, password: string): Promise<User | null> => {
  //  Simulación de latencia de red
  await delay(300);

  //  Aquí se está "simulando" lo que normalmente haría el backend:
  // buscar un usuario en base de datos
  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  //  En un fetch real, aquí NO buscarías en un array,
  // sino que recibirías la respuesta del servidor

  /*
  EJEMPLO REAL con fetch:

  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) return null;

  const user = await response.json();
  return user;
  */

  //  Aquí simplemente devolvemos el resultado simulado
  return user || null;
};

// Simula fetch para POST /api/register
export const register = async (newUser: Omit<User, "id">): Promise<User> => {
  //  Simulación de latencia
  await delay(300);

  //  Simulación de creación de usuario (esto normalmente lo haría el backend)
  const user: User = {
    id: users.length + 1, // generación simple de ID
    ...newUser,           // spread de propiedades
  };

  //  Simulación de guardado en base de datos
  users.push(user);

  //  En un fetch real, NO harías push a un array
  // sino que enviarías los datos al servidor

  /*
   EJEMPLO REAL con fetch:

  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newUser)
  });

  if (!response.ok) {
    throw new Error("Error al registrar usuario");
  }

  const user = await response.json();
  return user;
  */

  //  Retorno simulado
  return user;
};



