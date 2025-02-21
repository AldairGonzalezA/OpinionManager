import { Router } from "express";
import { check } from "express-validator";
import { saveCategory, getCategory, searchCategory, updateCategory, deleteCategory } from "./category.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { existeCategory } from "../helpers/db-validator.js";

const router = Router();

router.get("/", getCategory)

router.get(
    "/searchCategory/:id",
    [
        check("id", "ID is invalid").isMongoId(),
        check("id").custom(existeCategory),
        validarCampos
    ],
    searchCategory
)

router.post(
    "/",
    [
        validarCampos
    ],
    saveCategory
),

router.put(
    "/:id",
    [
        
    ]
)