import express from 'express';
import logController from './log.controller';
import { authSession, authScopes } from '../../common/middlewares/token.middleware';

const router = express.Router();

router.get("/", [authSession, authScopes([1])], logController.getAll);

export default router;