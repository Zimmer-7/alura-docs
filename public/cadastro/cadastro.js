import emiteCadastrarUsuario from "./socket-cadastro.js"

const formulario = document.getElementById("form-cadastro")

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = formulario["input-usuario"].value;
    const senha = formulario["input-senha"].value;

    emiteCadastrarUsuario({ nome, senha })

})