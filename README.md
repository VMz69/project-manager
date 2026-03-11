# Sistema de Gestión de Proyectos y Tareas

## Descripción

Este proyecto es una **aplicación web desarrollada con Next.js, React y
TypeScript** que permite gestionar usuarios, proyectos y tareas dentro
de un sistema simple de administración.

El sistema incluye:

-   Registro e inicio de sesión de usuarios
-   Dashboard principal
-   Gestión de proyectos
-   Gestión de tareas

Para simplificar el desarrollo académico, el proyecto utiliza **datos
simulados (mocks)** en lugar de una base de datos real.

------------------------------------------------------------------------

# Tecnologías utilizadas

-   Next.js (App Router)
-   React
-   TypeScript
-   LocalStorage para persistencia de sesión
-   Datos simulados (Mocks)

------------------------------------------------------------------------

# Cómo ejecutar el proyecto

## 1. Clonar el repositorio

``` bash
git clone https://github.com/VMz69/project-manager.git
cd project-manager
```

## 2. Instalar dependencias

``` bash
npm install
```

## 3. Ejecutar el proyecto

``` bash
npm run dev
```

## 4. Abrir en el navegador

    http://localhost:3000

------------------------------------------------------------------------

# Rutas principales del sistema

  Ruta         Descripción
  ------------ ----------------------
  /login       Inicio de sesión
  /register    Registro de usuarios
  /dashboard   Panel principal
  /projects    Gestión de proyectos
  /tasks       Gestión de tareas

------------------------------------------------------------------------

# Distribución del equip

El proyecto se divide por **módulos funcionales**, asignando archivos
específicos a cada integrante.

## Coordinador -- Arquitectura

Responsable de la estructura base del sistema.

Archivos principales:

-   `types/`
-   `mocks/`
-   `context/AuthContext.tsx`
-   `components/ProtectedRoute.tsx`

------------------------------------------------------------------------

## Autenticación

Responsable del login y registro.

Archivos:

    app/login/page.tsx
    app/register/page.tsx
    services/authService.ts

------------------------------------------------------------------------

## Dashboard / UI

Responsable de la interfaz principal y navegación.

Archivos:

    app/dashboard/page.tsx
    components/Navbar.tsx

------------------------------------------------------------------------

## Proyectos

Responsable del módulo de proyectos.

Archivos:

    app/projects/page.tsx
    components/ProjectCard.tsx
    services/projectService.ts

------------------------------------------------------------------------

## Tareas

Responsable del módulo de tareas.

Archivos:

    app/tasks/page.tsx
    components/TaskCard.tsx
    services/taskService.ts

------------------------------------------------------------------------

# Estructura simplificada del proyecto

    src
    │
    ├── app
    │   ├── login
    │   ├── register
    │   ├── dashboard
    │   ├── projects
    │   └── tasks
    │
    ├── components
    │   ├── Navbar.tsx
    │   ├── ProjectCard.tsx
    │   ├── TaskCard.tsx
    │   └── ProtectedRoute.tsx
    │
    ├── context
    │   └── AuthContext.tsx
    │
    ├── mocks
    │   ├── users.ts
    │   ├── projects.ts
    │   └── tasks.ts
    │
    ├── services
    │   ├── authService.ts
    │   ├── projectService.ts
    │   └── taskService.ts
    │
    └── types
        ├── User.ts
        ├── Project.ts
        └── Task.ts

------------------------------------------------------------------------

# Flujo básico del sistema

1.  Un usuario se registra o inicia sesión.
2.  La sesión se guarda en **localStorage** mediante `AuthContext`.
3.  Las rutas privadas se protegen con `ProtectedRoute`.
4.  Los proyectos y tareas se almacenan en **arrays simulados (mocks)**.
5.  Los servicios (`services/`) manejan la lógica de cada módulo.

------------------------------------------------------------------------

# Despliegue

Enlace del proyecto desplegado:

    (Pendiente)

------------------------------------------------------------------------

# Notas

-   Este proyecto es de carácter **académico**.
-   No utiliza base de datos real.