import criaHashESal from "../utilidades/hashESal.js";
import { usuariosColecao } from "./dbConnect.js";

function encontraUsuario(nome){
    return usuariosColecao.findOne({ nome })
}

function cadastraUsuario({ nome, senha }){
    const { hash, sal } = criaHashESal(senha)

    return usuariosColecao.insertOne({ nome, hash, sal })
}

export { cadastraUsuario, encontraUsuario }
