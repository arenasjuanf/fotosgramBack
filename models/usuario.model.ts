import { Schema, model, Document } from "mongoose";

const usuarioSchema: Schema = new Schema({
    nombre:{
        type: String,
        required: [true, "Nombre es requerido"]
    },
    avatar:{
        type: String,
        default: "av-1.png"
    },
    email:{
        type: String,
        unique: true,
        required: [true, "Email es requerido"]
    },
    password:{
        type: String,
        required: [true, "Contraseña es requerida"]
    }
});

interface IUsuario extends Document {
    nombre: string;
    avatar: string;
    email: string;
    password: string;
}

export const Usuario = model<IUsuario>("Usuario", usuarioSchema);