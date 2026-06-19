import type { NextFunction, Request, Response } from "express";

interface RequestExtends extends Request{
    user?: any
}

export const RoleMiddleware = async(req:RequestExtends, res:Response, next:NextFunction)=>{
    if(req.user?.usuarioCargo !== "Instrutor"){
        return res.status(401).json({mensagem:"Somente Instrutores podem fazer essa ação!"})
    }
    return next()
}