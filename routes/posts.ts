import { Router, Response } from 'express';
import FileSystem from '../classes/file-system';
import { FileUpload } from '../interfaces/file-upload';
import { verificaToken } from '../middlewares/autenticacion';
import { Post } from '../models/post.model';

const postRoutes = Router();
const fileSystem: FileSystem = new FileSystem();


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

    body.img =  fileSystem.tmpToPost(req.usuario._id);

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


postRoutes.post("/archivos", [ verificaToken ] , async (req: any, res: Response) =>{

    if(!req.files){
        res.status(400).json({
            ok: false,
            mensaje: "no se subieron archivos"
        })
    }

    const file: FileUpload = req.files.image;
    const esImg = file.mimetype.includes("image");
    await fileSystem.guardarImgTmp( file, req.usuario._id );

    res.status(esImg ? 200 : 400).json({
        ok: esImg ,
        file: esImg ? file.mimetype : "Formato invalido"
    })

})

postRoutes.get('/imagen/:userId/:img', (req: any, res: Response) => {

    const { userId, img } = req.params;
    const pathFoto = fileSystem.getImgUrl(userId, img)
    res.sendFile(pathFoto);

});


export default postRoutes;