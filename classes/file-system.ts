import { FileUpload } from "../interfaces/file-upload";
import path from 'path';
import fs from 'fs';
import uniqid from "uniqid";

export default class FileSystem {

    constructor(){};

    guardarImgTmp( file: FileUpload, userId: string ){

        return new Promise<void>((resolve, reject) => {

            const path = this.crearCarpeta( userId ); 
            const nombreArchivo = this.generaNombre(file.name);
            
            file.mv( `${path}/${nombreArchivo}`, (err: any) => {
                if(err){
                    reject(err)
                }else{
                    resolve();
                }
            })
        })


    }

    private generaNombre( nombreOriginal: string ){
        const arr = nombreOriginal.split('.');
        const ext = arr[arr.length - 1];
        return `${uniqid()}.${ext}`;
    }

    private crearCarpeta( userId: string ){
        const pathUser = path.resolve( __dirname, '../uploads', userId );
        const tmpPath = pathUser+'/temp';

        if( !fs.existsSync(pathUser) ){
            fs.mkdirSync( pathUser );
            fs.mkdirSync( tmpPath );
        }

        return tmpPath;
    }

    tmpToPost( userId: string ){
        const pathTmp = path.resolve( __dirname, '../uploads', userId, 'temp' );
        const pathPost = path.resolve( __dirname, '../uploads', userId, 'posts' );

        if(!fs.existsSync(pathTmp)){
            return []
        }

        if(!fs.existsSync(pathPost)){
            fs.mkdirSync( pathPost );
        }

        const imgTmp = this.obtenerTmpImg(userId);
        imgTmp.forEach( img => {
            fs.renameSync(`${pathTmp}/${img}`, `${pathPost}/${img}` )
        })

        return imgTmp;

    }

    obtenerTmpImg( userId: string ){
        const pathTmp = path.resolve( __dirname, '../uploads', userId, 'temp' );
        return fs.readdirSync(pathTmp) || [];


    }

    getImgUrl( userId: string, img: string){

        const pathFoto = path.resolve( __dirname, '../uploads', userId, 'posts', img );;

        return fs.existsSync(pathFoto) ? pathFoto : path.resolve(__dirname, '../assets/400x250.jpg') ;


    }

}