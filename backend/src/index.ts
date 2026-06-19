import express from 'express'
import UserRouter from './routes/UserRouter'
import FichaRouter from './routes/FichaRouter'
import bcrypt from 'bcrypt'
import prisma from './lib/prisma'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import 'dotenv/config'

const app = express()

const JWT_SECRET = process.env.JWT_SECRET || ""

app.use(express.json())
app.use(cors())

app.get('/', (req,res)=>{
    res.send("Api funcionando!")
})

app.post("/auth/login",async(req,res)=>{
    const {email,senha} = req.body

    const usuario = await prisma.usuario.findUnique({where:{email}})

    if(usuario){
        const senhaValida = await bcrypt.compare(String(senha),String(usuario.senha))

        if(!senhaValida) return res.status(400).json({mensagem:"Email ou senha invalidos!"})
        const usuarioId = usuario.id
        const usuarioNome = usuario.nome
        const usuarioCargo = usuario.cargo
        
        const token = jwt.sign(
            {usuarioId,usuarioNome,usuarioCargo},
            JWT_SECRET,
            {expiresIn: '1h'}
        )
        res.status(200).json({mensagem:"Login efetuado com sucesso!",token:token})
    }else{
        res.status(404).json({mensagem:"Usuario nao encontrado!"})
    }

})
app.use("/usuarios",UserRouter)
app.use("/fichas",FichaRouter)

app.listen(3001,()=>{
    console.log("Servidor rodando em http://localhost:3001")
})