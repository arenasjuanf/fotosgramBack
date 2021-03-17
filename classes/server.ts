
import express from "express"; 
import { Request, Response } from "express";


export default class Server {

    public app: express.Application;
    public port: number = 3000;

    constructor(){
        this.app = express();

        this.app.get("/", (req: Request, res: Response) => {
            res.send('... Server ...');
        });

    }

    start(cb: () => void | Function ){
        this.app.listen( this.port, cb );
    }

}