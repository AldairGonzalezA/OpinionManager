import { Router } from "express";
import { check } from "express-validator";
import { saveComment, updateComment, deleteComment } from "./comment.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarCampos } from '../middlewares/validar-campos.js';
import { existeComment } from "../helpers/db-validator.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        validarCampos
    ],
    saveComment
)

router.put(
    "/:id",
    [
        validarJWT,
        check("id", "ID is invalid").isMongoId(),
        check("id").custom(existeComment),
        validarCampos
    ],
    updateComment
)

router.delete(
    "/:id",
    [
        validarJWT,
        check("id", "ID is invalid").isMongoId(),
        check("id").custom(existeComment),
        validarCampos
    ],
    deleteComment
)

export default router;