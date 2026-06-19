import { Router } from "express";
import { atualizarUsuario, buscarUsuarios, criarUsuario, deletarUsuario } from "../controllers/UserController"
import {LoginMiddleware } from '../middlewares/LoginMiddleware'

const router = Router()

router.get("/",LoginMiddleware,buscarUsuarios)
router.post("/",criarUsuario)
router.patch("/:id",LoginMiddleware,atualizarUsuario)
router.delete("/:id",LoginMiddleware,deletarUsuario)

export default router