"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const usuarios_1 = __importDefault(require("./routes/usuarios"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
mongoose_1.default.set('useFindAndModify', false);
const server = new server_1.default();
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// rutas
server.app.use("/user", usuarios_1.default);
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
