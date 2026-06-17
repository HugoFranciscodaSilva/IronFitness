import { Router } from "express";
import { AtualizarFicha, CriarFicha, DeletarFicha, MostrarFichas, MostrarFichaUnica } from "../controllers/FichaController";


const router = Router()

router.get("/",MostrarFichas)
router.get("/:id",MostrarFichaUnica)
router.post("/",CriarFicha)
router.patch("/:id",AtualizarFicha)
router.delete("/:id",DeletarFicha)

export default router