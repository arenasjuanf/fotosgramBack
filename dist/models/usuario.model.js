"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuarioSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, "Nombre es requerido"]
    },
    avatar: {
        type: String,
        default: "av-1.png"
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email es requerido"]
    },
    password: {
        type: String,
        required: [true, "Contraseña es requerida"]
    }
}, { versionKey: false });
usuarioSchema.method("compararPassword", function (pass) {
    return bcrypt_1.default.compareSync(pass, this.password) ? true : false;
});
exports.Usuario = mongoose_1.model("Usuario", usuarioSchema);
