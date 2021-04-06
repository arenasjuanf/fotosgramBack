import express from "express";
import { Router, Request, Response } from "express";
import { IUsuario, Usuario } from "../models/usuario.model";
import bcrypt from "bcrypt";
import Token from "../classes/token";
import { verificaToken } from "../middlewares/autenticacion";


const userRoutes:express.Router = Router();

userRoutes.post("/login", (req: Request, res: Response) => {

    const  { email, password } = req.body;

    Usuario.findOne({email}).then((user) => {
        user = (user as IUsuario);
        
        const valid = user.compararPassword(password);


        const {_id, nombre, email, avatar } = user; 
        const token = Token.getJwtToken({_id, nombre, email, avatar });
        

        res.json({
            ok: valid,
            msg: valid ? "logged ok" : "credenciales incorrectas",
            token: valid ? token : null,
            user
        });
        
    }).catch((err) => {

        res.json({
            ok: false,
            msg: "Error",
            err
        });

    })
}) 

userRoutes.post("/create", (req: Request, res: Response) => {

    const  { nombre, email, password, avatar } = req.body;

    Usuario.create({
        nombre,
        email, 
        password: encriptar(password),
        avatar 
    }).then((user) => {

        const {_id, nombre, email, avatar } = user; 
        const token = Token.getJwtToken({_id, nombre, email, avatar });

        res.json({
            token,
            ok: true,
            msg: "usuario creado",
            user
        }
    )}).catch((err) => {
        res.json({
            ok: false,
            msg: "error creando usuario",
            err
        })
    })
})

userRoutes.post("/update", verificaToken ,  (req: any, res: Response) => {


    Usuario.findByIdAndUpdate(req.usuario._id, req.body , {new: true, context: 'query'}, (err, userDB) => {

        
        if(err){
            throw err;
        }

        const user = (userDB as IUsuario);


        const {_id, nombre, email, avatar } = user; 
        const token = Token.getJwtToken({_id, nombre, email, avatar });
        
        res.json({
            ok: true,
            token
        })

    });


})


const encriptar = (text: string) => bcrypt.hashSync(text, 10);

export default userRoutes;
