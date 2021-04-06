import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import { Post } from '../models/post.model';

const postRoutes = Router();


postRoutes.get("/", async (req: any, res: Response) => {


    const { pagina } = req.query || 1;
    const skip = (+pagina - 1)  * 10 ;

    const posts = await Post.find().sort({ _id: -1 }).limit(10).skip(skip).populate("usuario", "-password").exec();

    res.json({
        ok: true,
        pagina,
        posts
    });
});

postRoutes.post("/", [ verificaToken ], (req: any, res: Response) => {
    const {body} = req;
    body.usuario = req.usuario._id;

    Post.create(body).then( async post => {

        await post.populate("usuario", "-password").execPopulate();

        res.json({
            ok: true,
            post
        })
    }).catch( err => {
        res.json(err);
    });

});

export default postRoutes;