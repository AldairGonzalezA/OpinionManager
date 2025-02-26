import { Router } from "express";
import { check } from 'express-validator';
import { getPublications, savePublication, searchPublication, updatePublication, deletePublication } from "./publication.controller.js";
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { existePublicacion } from "../helpers/db-validator.js";

const router = Router();

router.get("/", getPublications)

router.get(
    "/findPublication/:id",
    [
        check("id", "ID is invalid").isMongoId(),
        check("id").custom(existePublicacion),
        validarCampos
    ],
    searchPublication
)

router.post(
    "/",
    [
        validarJWT,
        validarCampos
    ],
    savePublication
)

router.put(
    "/:id",
    [
        validarJWT,
        check("id", "ID is invalid").isMongoId(),
        check("id").custom(existePublicacion),
        validarCampos
    ],
    updatePublication
)

router.delete(
    "/:id",
    [
        validarJWT,
        check("id", "ID is invalid").isMongoId(),
        check("id").custom(existePublicacion),
        validarCampos
    ],
    deletePublication
)

export default router;