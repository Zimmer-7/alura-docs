import {encontraUsuario} from "../db/usuariosDB.js";
import autenticaUsuario from "../utilidades/autenticaUsuario.js";
import gerarJWT from "../utilidades/geradorJWT.js";

function registraEventosLogin(socket, io) {
    socket.on("autenticar-usuario", async ({ nome, senha }) => {

        const usuario = await encontraUsuario(nome)

        if(usuario){
            const autenticado = autenticaUsuario(senha, usuario)
    
            if(autenticado == true){
                const token = gerarJWT({ nomeUsuario: nome });
    
                socket.emit("autenticacao-sucesso", token);
            } else {
                socket.emit("autenticacao-fracasso")
            }

        } else {
            socket.emit("usuario-nao-encontrado")
        }

 
    })    
}

export default registraEventosLogin;