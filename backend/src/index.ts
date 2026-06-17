import express from 'express'
import prisma from './lib/prisma'
import bcrypt from 'bcrypt'

interface UsuarioProps{
    nome:string
    email:string,
    senha:string
}


const app = express()

app.use(express.json())

app.get('/', (req,res)=>{
    res.send("Api funcionando!")
})

app.get('/usuarios',async (req,res)=>{
    try {
        const resposta = await prisma.usuario.findMany()
        res.status(200).json(resposta)
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem:"Erro ao listar alunos"})
    }
})

app.post('/usuarios',async(req,res)=>{
    const {nome,email,senha,cargo} = req.body

    if(!nome) return res.status(400).json({mensagem:"Preencha o nome!"})
    if(!email) return res.status(400).json({mensagem:"Preencha o email!"})
    if(!senha) return res.status(400).json({mensagem:"Preencha a senha!"})
    if(!cargo) return res.status(400).json({mensagem:"Preencha o cargo!"})

    if(nome && email && senha && cargo){
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
    } else{
        res.status(400).json({mensagem:"Preencha todos os campos!"})
    }
    
})

app.patch("/usuarios/:id",async (req,res)=>{
    const {id} = req.params
    const {nome,email,senha} = req.body

    const senhaHash = await bcrypt.hash(String(senha),10)
    
    const dadosAtualizados:UsuarioProps = {nome,email,senha}
    
    if(nome) dadosAtualizados.nome = nome
    if(email) dadosAtualizados.email = email
    if(senha) dadosAtualizados.senha = senhaHash


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
})

app.delete("/usuarios/:id",async(req,res)=>{
    const {id} = req.params

    try {
        await prisma.usuario.delete({where:{id:Number(id)}})
        res.status(204).end()
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem:"Erro ao deletar usuario!"})
    }
})

app.listen(3001,()=>{
    console.log("Servidor rodando em http://localhost:3001")
})