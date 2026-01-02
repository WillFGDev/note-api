import express from 'express';
import roleController from './role.controller';
import { authSession, authScopes } from '../../common/middlewares/token.middleware';

const router = express.Router();

router.get("/", [authSession, authScopes([1])], roleController.getAll);
router.get("/:id", [authSession, authScopes([1])], roleController.getOne);
router.post("/", [authSession, authScopes([1])], roleController.create);
router.put("/:id", [authSession, authScopes([1])], roleController.update);
router.delete("/:id", [authSession, authScopes([1])], roleController.delete);

export default router;