import type { Request,Response,NextFunction } from "express"
import jwt from 'jsonwebtoken'
import  'dotenv/config'


interface RequestExtends extends Request{
    user?: any
}
const JWT_SECRET = process.env.JWT_SECRET || ""

export const LoginMiddleware = async (req:RequestExtends,res:Response,next:NextFunction) =>{
    const authHeader = req.headers.authorization

    if(!authHeader) return res.status(401).json({mensagem:"Token nao fornecido!"})

    const [schema,token] = authHeader.split(' ')

    if(!token || schema !== "Bearer") return res.status(401).json({mensagem:"Token malformatado!"})

    try {
        const decode = jwt.verify(token,JWT_SECRET)

        req.user = decode
        return next()
    } catch (error) {
        return res.status(401).json({mensagem:"Token invalido ou expirado!"})

    }
}