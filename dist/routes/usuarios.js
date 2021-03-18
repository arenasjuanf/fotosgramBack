"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_model_1 = require("../models/usuario.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRoutes = express_1.Router();
userRoutes.post("/login", (req, res) => {
    const { email, password } = req.body;
    usuario_model_1.Usuario.findOne({ email }).then((user) => {
        const ok = encriptar(password) == (user === null || user === void 0 ? void 0 : user.password) && user;
        console.info(encriptar(password));
        res.json({
            ok,
            msg: !ok ? "usuario no existe" : 'Success',
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
        res.json({
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
const encriptar = (text) => bcrypt_1.default.hashSync(text, 10);
exports.default = userRoutes;
