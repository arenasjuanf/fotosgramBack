import express, { response } from "express";
import { Router, Request, Response } from "express";


const userRoutes:express.Router = Router();


userRoutes.post("/create", (req: Request, res: Response) => {

    const  { nombre, email, password } = req.body;

    res.json({
        ok: true,
        msg: "todo funca bien"
    })
})



export default userRoutes;
