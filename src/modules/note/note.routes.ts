import express from 'express';
import noteController from './note.controller';
import { authSession, authScopes } from '../../common/middlewares/token.middleware';

const router = express.Router();

router.get("/", [authSession, authScopes([2])], noteController.getAll);
router.get("/:id", [authSession, authScopes([2])], noteController.getOne);
router.post("/", [authSession, authScopes([3])], noteController.create);
router.put("/:id", [authSession, authScopes([3])], noteController.update);
router.delete("/:id", [authSession, authScopes([4])], noteController.delete);

router.post("/:id/share", [authSession, authScopes([3])], noteController.share);

export default router;