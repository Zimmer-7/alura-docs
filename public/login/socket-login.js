import { defineCookie } from "../utilidades/cookie.js";

const socket = io()

function emiteAutenticarUsuario(dados){
    socket.emit("autenticar-usuario", dados)
}

socket.on("autenticacao-sucesso", (tokenJWT) => {
    defineCookie("tokenJWT", tokenJWT),
    alert("autenticação concluída! Seja bem vindo(a)!"),
    window.location.href = "/"
    })
    
socket.on("autenticacao-fracasso", () => alert("falha na autenticação"))

socket.on("usuario-nao-encontrado", () => alert("usuário não consta no banco de dados"))

export default emiteAutenticarUsuario
