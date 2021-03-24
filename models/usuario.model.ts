import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema: Schema<IUsuario> = new Schema({
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

export interface IUsuario extends Document {
    nombre: string;
    avatar: string;
    email: string;
    password: string;
    compararPassword(password: string): boolean;
}

usuarioSchema.method("compararPassword", function(pass: string ): boolean{
    return bcrypt.compareSync(pass, this.password) ? true : false;
});

export const Usuario = model<IUsuario>("Usuario", usuarioSchema);