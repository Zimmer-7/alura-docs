import emiteAutenticarUsuario from "./socket-login.js"

const formulario = document.getElementById("form-login")

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = formulario["input-usuario"].value;
    const senha = formulario["input-senha"].value;

    emiteAutenticarUsuario({ nome, senha })

})