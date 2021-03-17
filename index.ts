import Server from "./classes/server";
import userRoutes from "./routes/usuarios";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const server: Server = new Server();

server.app.use( bodyParser.urlencoded({ extended: true}) );
server.app.use( bodyParser.json());

// rutas
server.app.use( "/user", userRoutes);


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

