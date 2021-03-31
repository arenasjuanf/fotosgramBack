import { Response, Request, NextFunction } from "express";
import Token from "../classes/token";

export const verificaToken = ( req: Request | any , res: Response, next: NextFunction ) => {
    const userToken = req.get("x-token") || "";
    Token.comprobarToken( userToken ).then((decoded: any) => {
        req.usuario = decoded.usuario;
        next();
        return;
    }).catch( err => {
        res.json({
            ok:false,
            mensaje: "token no es correcto "+err
        })
        return;
    })

}