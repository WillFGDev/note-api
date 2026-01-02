import * as TJS from "typescript-json-schema";
import * as fs from "fs";
import * as path from "path";

const settings: TJS.PartialArgs = {
  required: true, 
};

const files = [
  "./src/modules/auth/auth.interface.ts",
  "./src/modules/user/user.interface.ts",
  "./src/modules/role/role.interface.ts",
  "./src/modules/note/note.interface.ts",
  "./src/modules/scope/scope.interface.ts",
  "./src/common/interfaces/response.interface.ts",
];

const program = TJS.getProgramFromFiles(files, { strictNullChecks: true });
const schema = TJS.generateSchema(program, "*", settings);

fs.writeFileSync(path.resolve(__dirname, "swaggerSchemas.json"), JSON.stringify(schema, null, 2));

console.log("Esquema JSON generado en swagger-schemas.json");