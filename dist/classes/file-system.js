"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uniqid_1 = __importDefault(require("uniqid"));
class FileSystem {
    constructor() { }
    ;
    guardarImgTmp(file, userId) {
        return new Promise((resolve, reject) => {
            const path = this.crearCarpeta(userId);
            const nombreArchivo = this.generaNombre(file.name);
            file.mv(`${path}/${nombreArchivo}`, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    generaNombre(nombreOriginal) {
        const arr = nombreOriginal.split('.');
        const ext = arr[arr.length - 1];
        return `${uniqid_1.default()}.${ext}`;
    }
    crearCarpeta(userId) {
        const pathUser = path_1.default.resolve(__dirname, '../uploads', userId);
        const tmpPath = pathUser + '/temp';
        if (!fs_1.default.existsSync(pathUser)) {
            fs_1.default.mkdirSync(pathUser);
            fs_1.default.mkdirSync(tmpPath);
        }
        return tmpPath;
    }
    tmpToPost(userId) {
        const pathTmp = path_1.default.resolve(__dirname, '../uploads', userId, 'temp');
        const pathPost = path_1.default.resolve(__dirname, '../uploads', userId, 'posts');
        if (!fs_1.default.existsSync(pathTmp)) {
            return [];
        }
        if (!fs_1.default.existsSync(pathPost)) {
            fs_1.default.mkdirSync(pathPost);
        }
        const imgTmp = this.obtenerTmpImg(userId);
        imgTmp.forEach(img => {
            fs_1.default.renameSync(`${pathTmp}/${img}`, `${pathPost}/${img}`);
        });
        return imgTmp;
    }
    obtenerTmpImg(userId) {
        const pathTmp = path_1.default.resolve(__dirname, '../uploads', userId, 'temp');
        return fs_1.default.readdirSync(pathTmp) || [];
    }
    getImgUrl(userId, img) {
        const pathFoto = path_1.default.resolve(__dirname, '../uploads', userId, 'posts', img);
        ;
        return fs_1.default.existsSync(pathFoto) ? pathFoto : path_1.default.resolve(__dirname, '../assets/400x250.jpg');
    }
}
exports.default = FileSystem;
