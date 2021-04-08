"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const usuarios_1 = __importDefault(require("./routes/usuarios"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const posts_1 = __importDefault(require("./routes/posts"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
mongoose_1.default.set('useFindAndModify', false);
const server = new server_1.default();
// bodyParser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// fileUpload
server.app.use(express_fileupload_1.default({ useTempFiles: true }));
// rutas
server.app.use("/user", usuarios_1.default);
server.app.use("/post", posts_1.default);
// se levanta server
server.start(() => {
    console.log(`--- Port ${server.port} ---`);
    mongoose_1.default.connect('mongodb://localhost:27017/fotosgram', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    }, (err) => {
        if (err)
            throw (err);
        console.log('DB Ready');
    });
});
// Ruta para subir archivos
