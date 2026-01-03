import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHandler from './common/middlewares/error.middleware';
import dotenv from "dotenv";
import morgan from 'morgan';
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/user/user.routes";
import roleRoutes from "./modules/role/role.routes";
import scopeRoutes from "./modules/scope/scope.routes";
import noteRoutes from "./modules/note/note.routes";
import logRoutes from "./modules/log/log.routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger/swagger";
//import { DBDefaultSetup } from "./database/defaultSetup";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/scope", scopeRoutes);
app.use("/api/note", noteRoutes);
app.use("/api/log", logRoutes);

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//DBDefaultSetup();

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});