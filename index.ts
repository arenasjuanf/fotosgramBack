import Server from "./classes/server";
import userRoutes from "./routes/usuarios";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import postRoutes from "./routes/posts";
import fileUpload from "express-fileupload";

mongoose.set('useFindAndModify', false);
const server: Server = new Server();

// bodyParser
server.app.use( bodyParser.urlencoded({ extended: true}) );
server.app.use( bodyParser.json());

// fileUpload
server.app.use(fileUpload({ useTempFiles: true }));

// rutas
server.app.use( "/user", userRoutes);
server.app.use("/post", postRoutes);

// se levanta server
server.start( () => {
    console.log(`--- Port ${server.port} ---`);
    mongoose.connect('mongodb://localhost:27017/fotosgram', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    },(err) => {
        if(err) throw(err);
        console.log('DB Ready');
    });
});

// Ruta para subir archivos

