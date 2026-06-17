import type { Request,Response } from "express";
import prisma from "../lib/prisma";

interface FichaProps{
    nomeTreino?:String,
    seriesTreino?:Number
    repeticoesTreino?:Number
}

export const MostrarFichas = async (req:Request,res:Response)=>{
    try {
        const resposta = await prisma.fichaTreino.findMany()
        res.status(200).json(resposta)
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem:"Erro ao listar fichas!"})
    }
} 
export const MostrarFichaUnica = async (req:Request,res:Response)=>{
    const {id} = req.params

    try {
        const resposta = await prisma.fichaTreino.findMany({where:{idAluno:Number(id)}})
        res.status(200).json(resposta)
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem:"Erro ao mostrar fichas do Aluno ",id})
    }
} 

export const CriarFicha = async (req:Request,res:Response)=>{
    const {nomeTreino,repeticoesTreino,seriesTreino,idAluno,idInstrutor} = req.body

    try {
        await prisma.fichaTreino.create({
            data:{
                nomeTreino,
                repeticoesTreino,
                seriesTreino,
                idAluno,
                idInstrutor
            }
        })
        res.status(201).json({mensagem:"Ficha criada com sucesso!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem:"Erro ao criar ficha!"})
    }
} 
export const AtualizarFicha = async (req:Request,res:Response)=>{
    const {id} = req.params
    const {nomeTreino,seriesTreino,repeticoesTreino} = req.body

    const dadosAtualizar:FichaProps = {}

    if(nomeTreino) dadosAtualizar.nomeTreino = nomeTreino
    if(repeticoesTreino) dadosAtualizar.repeticoesTreino = repeticoesTreino
    if(seriesTreino) dadosAtualizar.seriesTreino = seriesTreino


    if(Object.keys(dadosAtualizar).length === 0) return res.status(404).json({mensagem:"Não há campos para atualizar!"})

    try {
        await prisma.fichaTreino.update({
            where:{
                id:Number(id)
            },
            data:dadosAtualizar
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem:"Erro ao atualizar a ficha!"})
    }
} 
export const DeletarFicha = async (req:Request,res:Response)=>{
    const {id} = req.params

    try {
        await prisma.fichaTreino.delete({where:{id:Number(id)}})
        res.status(204).end()
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem:"Erro ao deletar ficha!"})
    }
} 