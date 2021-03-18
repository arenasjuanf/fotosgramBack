import express, { response } from "express";
import { Router, Request, Response } from "express";
import { Usuario } from "../models/usuario.model";
import bcrypt from "bcrypt";


const userRoutes:express.Router = Router();

userRoutes.post("/login", (req: Request, res: Response) => {

    const  { email, password } = req.body;

    Usuario.findOne({email}).then((user) => {


        const ok = encriptar( password ) == user?.password && user;
        console.info(encriptar( password ) );
        res.json({
            ok,
            msg: !ok ? "usuario no existe" : 'Success',
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
        res.json({
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


const encriptar = (text: string) => bcrypt.hashSync(text, 10);



export default userRoutes;
