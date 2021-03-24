"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_model_1 = require("../models/usuario.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../classes/token"));
const autenticacion_1 = require("../middlewares/autenticacion");
const userRoutes = express_1.Router();
userRoutes.post("/login", (req, res) => {
    const { email, password } = req.body;
    usuario_model_1.Usuario.findOne({ email }).then((user) => {
        user = user;
        const valid = user.compararPassword(password);
        const { _id, nombre, email, avatar } = user;
        const token = token_1.default.getJwtToken({ _id, nombre, email, avatar });
        res.json({
            ok: valid,
            msg: valid ? "logged ok" : "credenciales incorrectas",
            token: valid ? token : null,
            user
        });
    }).catch((err) => {
        res.json({
            ok: false,
            msg: "Error",
            err
        });
    });
});
userRoutes.post("/create", (req, res) => {
    const { nombre, email, password, avatar } = req.body;
    usuario_model_1.Usuario.create({
        nombre,
        email,
        password: encriptar(password),
        avatar
    }).then((user) => {
        const { _id, nombre, email, avatar } = user;
        const token = token_1.default.getJwtToken({ _id, nombre, email, avatar });
        res.json({
            token,
            ok: true,
            msg: "usuario creado",
            user
        });
    }).catch((err) => {
        res.json({
            ok: false,
            msg: "error creando usuario",
            err
        });
    });
});
userRoutes.post("/update", [autenticacion_1.verificaToken], (req, res) => {
});
const encriptar = (text) => bcrypt_1.default.hashSync(text, 10);
exports.default = userRoutes;
