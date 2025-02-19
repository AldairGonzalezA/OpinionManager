import { Router } from 'express';
import { check } from 'express-validator';
import {getUsers, searchUser, updateUser, updatePassword} from '../users/user.controller.js';

const router = Router();

router.get("/", getUsers)

router.get(
    "/findUser/:id",
    [
        check("id", "ID is invalid").isMongoId(),

    ],
    searchUser
)

router.put(
    "/:id",
    [
        check("id", "ID is invalid").isMongoId(),
    ],
    updateUser
)

router.put(
    "/updatePassword/:id",
    [
        check("id", "ID is invalid").isMongoId(),

    ],
    updatePassword
)

export default router;