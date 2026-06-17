import { Router } from "express";
import { AtualizarFicha, CriarFicha, DeletarFicha, MostrarFichas, MostrarFichaUnica } from "../controllers/FichaController";
import { LoginMiddleware } from "../middlewares/LoginMiddleware";


const router = Router()

router.use(LoginMiddleware)

router.get("/",MostrarFichas)
router.get("/:id",MostrarFichaUnica)
router.post("/",CriarFicha)
router.patch("/:id",AtualizarFicha)
router.delete("/:id",DeletarFicha)

export default router