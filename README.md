# Note API

API REST para la gestión de notas con autenticación de usuarios, desarrollada con Node.js y TypeScript.

## Tecnologías / Herramientas

- Node.js 22
- TypeScript
- Express
- Sequelize
- Sqlite
- JWT
- Bcrypt
- Cookie-Parser
- Swagger
- Jest
- Docker

## Funcionalidades

- Registro e inicio de sesión de usuarios
- Autenticación mediante JWT y Cookies
- CRUD de notas
- Asociación de notas por usuario
- Logs, Validaciones y manejo de errores
- Pruebas unitarias

## Instalación y ejecución local

1. Clonar el repositorio:
   ```git clone https://github.com/WillFGDev/note-api.git```
2. Instalar dependencias:
   ```npm install```
3. Configurar variables de entorno:
   - crear un archivo .env
   - pegar las siguientes variables de ejemplos dentro del archivo .env:
     ```
     PORT: 3000
     JWT_SECRET_KEY: 12345
     JWT_TOKEN_TIME: 8h
     ``` 
4. Ejecutar en desarrollo:
   ```npm run dev```

## Documentacion

Swagger disponible en: ```http://localhost:3000/```

## Unit tests

Para ejecutar las pruebas unitarias ejecuta el siguiente script:
```npm run test```

## Build

Para buildear el proyecto se ejecuta el siguiente script:
```npm run build```

## Docker

Para ejecutar con Docker:
```docker compose up --build```

## Estado del proyecto

Proyecto en desarrollo, creado con fines demostrativos y de evaluación técnica, puede extenderse con nuevas funcionalidades.

## Autor

Williner Garcia  
GitHub: https://github.com/WillFGDev
