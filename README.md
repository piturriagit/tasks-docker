# TasksWebApp
Caso de práctica
=======

# Actividad práctica individual: “Gestor de Tareas Web”
Cómo ejecutarlo:
1. Genera el jar (yo lo he hecho desde maven con la opcion clean, validate, compile, test y finalmente package que genera el jar en target)
2. Recoge el jar: MyTasks.v1.0.jar
3. Ejecuta java con el jar: 
        `$ java -jar MyTasks.jar`
4. Entra en la carpeta del proyecto con el frontend e instala npm
        `TasksWebApp-Frontend $ npm install` 
5. Ejecuta angular: 
        `TasksWebApp-Frontend $ ng serve`



=======
# Actividad práctica individual: “Gestor de Tareas Web”
Caso práctico para cusro CoreNetworks

Objetivo:
Desarrollar una aplicación web que permita a un usuario gestionar sus tareas personales, aplicando los conocimientos adquiridos a lo largo del curso: Java, Spring, MySQL, Angular, HTML/CSS/JS y control de versiones con Git.

## Requisitos funcionales mínimos:
1. Frontend (Angular):
   - [X] Interfaz con formulario para crear nuevas tareas (título y descripción).
   - [X] Listado de tareas.
   - [X] Botón para editar y borrar tareas.
   - [X] Validación básica de formularios.
2. Backend (Java + Spring Boot): 
   - [X] API REST que permita:
       - [X] Crear una tarea.
       - [X] Obtener todas las tareas.
       - [X] Actualizar una tarea.
       - [X] Eliminar una tarea.
       - extra Eliminar todas las tareas
   - [X] Uso de controladores, servicios y repositorios (DAO).
3. Base de datos (MySQL):
   - [X] Base de datos con una tabla tareas:
      - [X] id (clave primaria, autoincremental)
      - [X] titulo (varchar)
      - [X] descripcion (text)
      - [X] fecha_creacion (timestamp)
4. Seguridad y despliegue:
   - [X] Añadir autenticación básica con JWT (puede ser simulada con un token fijo).
   - [X] Despliegue local de frontend y backend (no es necesario en servidor real, aunque se valorará si se hace).
5. Control de versiones:
   - [X] Repositorio en GitHub con los distintos commits bien organizados (mínimo 3-4 commits significativos).
   - [X] Se valorará el uso de ramas.

## Entregables:
- [X] Código fuente completo.
- [X] Archivo README.md con instrucciones para ejecutar el proyecto.
- [X] Capturas de pantalla del funcionamiento de la app.
- [X] (Opcional) Vídeo de menos de 2 minutos mostrando el uso de la aplicación.

## Evaluación:
- Se valorará la correcta integración entre frontend y backend.
- Buen uso de Angular y Spring Boot.
- Limpieza y claridad del código.
- Que se utilice Git de forma básica (mínimo 3-4 commits significativos).
- Que se aplique el modelo MVC y uso de capas en el backend.


# Testing
For testing purposes, you can use:
- Backend http://localhost:8080/
  - Swagger UI: http://localhost:8080/swagger-ui/index.html
  - Loaded db in memory: http://localhost:8080/h2-console (db, db1)
- Frontend https://localhost:4200 Angular
- Default user when security enabled: (test, test)

# Environment configuration
