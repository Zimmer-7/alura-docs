import { cadastraUsuario, encontraUsuario } from "../db/usuariosDB.js"

function registraEventosCadastro(socket, io) {
    socket.on("cadastrar-usuario", async (dados) => {
        const usuario = await encontraUsuario(dados.nome)

        if(usuario == null){
            const resultado = await cadastraUsuario(dados)
    
            if (resultado.acknowledged == true){
                socket.emit("cadastro-sucesso")
            } else {
                socket.emit("cadastro-falha")
            }

        } else {
            socket.emit("usuario-existente")
        }

    })
}

export default registraEventosCadastro
