import express from 'express';
import userController from './user.controller';
import { authSession, authScopes } from '../../common/middlewares/token.middleware';

const router = express.Router();

router.get("/", [authSession, authScopes([1])], userController.getAll);
router.get("/:id", [authSession, authScopes([1])], userController.getOne);
router.post("/", [authSession, authScopes([1])], userController.create);
router.put("/:id", [authSession, authScopes([1])], userController.update);
router.delete("/:id", [authSession, authScopes([1])], userController.delete);

export default router;