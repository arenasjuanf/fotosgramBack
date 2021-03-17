"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const mongoose_1 = require("mongoose");
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
});
exports.Usuario = mongoose_1.model("Usuario", usuarioSchema);
