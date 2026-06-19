import { Router } from "express";
import { AtualizarFicha, CriarFicha, DeletarFicha, MostrarFichaAluno, MostrarFichas } from "../controllers/FichaController";
import { LoginMiddleware } from "../middlewares/LoginMiddleware";
import { RoleMiddleware } from '../middlewares/RoleMiddleware'


const router = Router()

router.use(LoginMiddleware)

router.get("/",RoleMiddleware,MostrarFichas)
router.get("/:id",MostrarFichaAluno)


router.post("/",RoleMiddleware,CriarFicha)
router.patch("/:id",RoleMiddleware,AtualizarFicha)
router.delete("/:id",RoleMiddleware,DeletarFicha)

export default router