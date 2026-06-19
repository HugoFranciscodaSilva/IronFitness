import prisma from "../lib/prisma"
import bcrypt from 'bcrypt'
import type { Request,Response } from "express"

interface UsuarioProps{
    nome?:string
    email?:string,
    senha?:string
}



export const buscarUsuarios = async (req:Request,res:Response)=>{
    try {
        const resposta = await prisma.usuario.findMany({select:{
            id:true,
            nome:true,
            email:true,
            dataCriacao:true,
            cargo:true
        }})
        res.status(200).json(resposta)
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem:"Erro ao listar usuarios"})
    }
}

export const criarUsuario = async(req:Request,res:Response)=>{
    const {nome,email,senha,cargo} = req.body

    if(!nome) return res.status(400).json({mensagem:"Preencha o nome!"})
    if(!email) return res.status(400).json({mensagem:"Preencha o email!"})
    if(!senha) return res.status(400).json({mensagem:"Preencha a senha!"})
    if(!cargo) return res.status(400).json({mensagem:"Preencha o cargo!"})

    try {
        const senhaHash = await bcrypt.hash(String(senha),10)
        await prisma.usuario.create({
            data:{
                nome,
                email,
                senha:senhaHash,
                cargo
            }
        })
        res.status(201).json({mensagem:"Usuario Criado com sucesso!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem:"Erro ao criar usuario!"})
    }
    
}

export const atualizarUsuario = async (req:Request,res:Response)=>{
    const {id} = req.params
    const {nome,email,senha} = req.body
    
    const dadosAtualizados:UsuarioProps = {nome,email,senha}
    
    if(nome) dadosAtualizados.nome = nome
    if(email) dadosAtualizados.email = email
    if(senha) dadosAtualizados.senha = await bcrypt.hash(String(senha),10)
    
    if(Object.keys(dadosAtualizados).length === 0){
        return res.status(204).json({mensagem:"Sem Conteudo para atualizar!"})
    }

    try {
        await prisma.usuario.update({
            where:{id:Number(id)},
            data:{
                ...dadosAtualizados
            }
        })
        res.status(200).json({mensagem:"Usuario Atualizado com sucesso!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem:"Erro ao atualizar usuario!"})
    }
}

export const deletarUsuario = async(req:Request,res:Response)=>{
    const {id} = req.params

    try {
        await prisma.usuario.delete({where:{id:Number(id)}})
        res.status(204).end()
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem:"Erro ao deletar usuario!"})
    }
}
