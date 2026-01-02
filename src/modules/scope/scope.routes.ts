import express from 'express';
import scopeController from './scope.controller';
import { authSession, authScopes } from '../../common/middlewares/token.middleware';

const router = express.Router();

router.get("/", [authSession, authScopes([1])], scopeController.getAll);

export default router;