import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHandler from './common/middlewares/error.middleware';
import dotenv from "dotenv";
import morgan from 'morgan';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});