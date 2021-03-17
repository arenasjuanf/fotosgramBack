"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes = express_1.Router();
userRoutes.post("/create", (req, res) => {
    const { nombre, email, password } = req.body;
    res.json({
        ok: true,
        msg: "todo funca bien"
    });
});
exports.default = userRoutes;
