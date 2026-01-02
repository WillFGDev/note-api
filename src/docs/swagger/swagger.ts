import swaggerJsDoc from "swagger-jsdoc";
import * as path from "path";

const schemas = require(path.resolve(__dirname, './schema/swaggerSchemas.json')).definitions;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Basico de creacion de notas",
      version: "1.0.0",
      description: "Esta API proporciona funcionalidades de autenticación basada en JWT (almacenado en cookies), así como gestión de usuarios, roles, permisos y un CRUD básico para creación de notas. \n\n**Nota:** El inicio de sesión utiliza cookies. Al autenticarse correctamente, el token JWT se almacena automáticamente en una cookie (authToken), permitiendo acceder a las rutas protegidas sin necesidad de enviar manualmente el token. \n\nConsulta cada ruta para más detalles y ejemplos de uso.",
      contact: {
        name: "Williner Garcia",
        email: "willinergarciadev@gmail.com",
        url: "https://www.linkedin.com/in/williner-garc%C3%ADa-b35690207/"
      },
    },
    components: {
      schemas,
      securitySchemes: {
        CookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'authToken',
        },
      },
    },
  },
  apis: ["./src/docs/swagger/routes/*.ts"],
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
