# Fullstack Challenge: Gestor de Tareas con Autenticación (Backend)

## Descripción

Este proyecto es la parte del backend de una aplicación de gestión de tareas personales con autenticación. El sistema permite a los usuarios registrarse, iniciar sesión y realizar operaciones CRUD (crear, leer, actualizar, borrar) sobre sus tareas. La autenticación se maneja mediante JWT y la base de datos utilizada es PostgreSQL.

---

## Tecnologías Utilizadas

- **Node.js** con **Express**: Framework para construir el backend.
- **PostgreSQL**: Base de datos relacional para almacenar usuarios y tareas.
- **Passport-JWT**: Middleware para manejar la autenticación basada en tokens JWT.
- **Docker**: Configuración de la base de datos en contenedores.
- **Joi**: Validación de datos en las rutas.
- **dotenv**: Manejo de variables de entorno.

---

## Funcionalidades

### Autenticación de Usuario

- **Registro**: Permite a los usuarios registrarse con email y contraseña.
- **Login**: Autenticación de usuarios con email y contraseña.

### Gestión de Tareas

- **Crear Tarea**: Los usuarios pueden crear tareas con título (obligatorio), descripción, fecha límite y estado.
- **Listar Tareas**: Los usuarios pueden ver solo sus propias tareas.
- **Editar Tarea**: Los usuarios pueden actualizar sus tareas.
- **Borrar Tarea**: Los usuarios pueden eliminar sus tareas.

### Restricciones

- Los usuarios no pueden ver ni modificar tareas de otros usuarios.
- Validación de datos en el backend para garantizar la integridad.

---

## Rutas del Backend

### Autenticación (`/api/auth`)

- **POST `/register`**: Registro de usuario.
- **POST `/login`**: Inicio de sesión.

### Tareas (`/api/todo`)

🔒 Nota de Autenticación: Todas las rutas de /api/todo están protegidas. Debes incluir el token JWT que recibes al iniciar sesión en la cabecera de la solicitud de la siguiente manera: Authorization: Bearer <tu_token>.

- **POST `/`**: Crear una nueva tarea.
- **GET `/`**: Listar todas las tareas del usuario autenticado.
- **GET `/:id`**: Obtener una tarea específica por ID.
- **PUT `/:id`**: Actualizar una tarea existente.
- **DELETE `/:id`**: Eliminar una tarea por ID.

---

## Configuración del Proyecto

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Servidor
PORT=5001

# Base de datos PostgreSQL
DATABASE=nombre_de_tu_base_de_datos
DB_USER=usuario_de_postgres
DB_HOST=localhost
DB_PORT=5432
DB_PASSWORD=contraseña_de_postgres

# JWT Configuration
JWT_SECRET=clave_secreta_para_jwt
JWT_EXPIRES_IN=3600
```

### Base de Datos en Docker

Si estás utilizando Docker para la base de datos, asegúrate de tener un contenedor de PostgreSQL configurado. Aquí hay un ejemplo de cómo hacerlo con Docker:

```bash
docker run --name postgres-todo -e POSTGRES_USER=usuario_de_postgres \
  -e POSTGRES_PASSWORD=contraseña_de_postgres \
  -e POSTGRES_DB=nombre_de_tu_base_de_datos \
  -p 5432:5432 -d postgres
```

---

## Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/Facupelli/zafirus-challenge.git
cd fullstack-challenge-backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar el servidor en desarrollo

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:5001`.

### 3. Iniciar el servidor en producción

```bash
npm run start
```

---

## Notas

- **Validación**: Todas las rutas utilizan `Joi` para validar los datos de entrada.
- **Autenticación**: El middleware `protect` asegura que solo usuarios autenticados puedan acceder a las rutas de tareas.
- **Errores**: El backend maneja errores de red y validaciones con respuestas claras para el cliente.

---

## Posibles Mejoras

- **Typescript**: Agregar Typescript para reducir errores comunes, mejorar legibilidad y mantenimiento.
- **Migración**: Configurar alguna herramienta para manejar migraciones de la base de datos.
- **Pruebas**: Implementar pruebas unitarias y o pruebas de integración para garantizar la fiabilidad del código.
- **Documentación**: Considerar el uso de herramientas como Swagger/OpenAPI para documentar la API automáticamente.
