import express from 'express'
import UserRouter from './routes/UserRouter'
import FichaRouter from './routes/FichaRouter'
const app = express()

app.use(express.json())

app.get('/', (req,res)=>{
    res.send("Api funcionando!")
})


app.use("/usuarios",UserRouter)
app.use("/fichas",FichaRouter)

app.listen(3001,()=>{
    console.log("Servidor rodando em http://localhost:3001")
})