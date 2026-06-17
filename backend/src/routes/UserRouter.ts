import { Router } from "express";
import { atualizarUsuario, buscarUsuarios, criarUsuario, deletarUsuario } from "../controllers/UserController"


const router = Router()

router.get("/",buscarUsuarios)
router.post("/",criarUsuario)
router.patch("/:id",atualizarUsuario)
router.delete("/:id",deletarUsuario)

export default router