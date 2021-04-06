"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autenticacion_1 = require("../middlewares/autenticacion");
const post_model_1 = require("../models/post.model");
const postRoutes = express_1.Router();
postRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pagina } = req.query || 1;
    const skip = (+pagina - 1) * 10;
    const posts = yield post_model_1.Post.find().sort({ _id: -1 }).limit(10).skip(skip).populate("usuario", "-password").exec();
    res.json({
        ok: true,
        pagina,
        posts
    });
}));
postRoutes.post("/", [autenticacion_1.verificaToken], (req, res) => {
    const { body } = req;
    body.usuario = req.usuario._id;
    post_model_1.Post.create(body).then((post) => __awaiter(void 0, void 0, void 0, function* () {
        yield post.populate("usuario", "-password").execPopulate();
        res.json({
            ok: true,
            post
        });
    })).catch(err => {
        res.json(err);
    });
});
exports.default = postRoutes;