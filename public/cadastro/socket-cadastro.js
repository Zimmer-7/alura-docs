const socket = io()

function emiteCadastrarUsuario(dados) {
    socket.emit("cadastrar-usuario", dados)
}

socket.on("cadastro-sucesso", () => alert('cadastro realizado com sucesso!'))
socket.on("cadastro-falha", () => alert('erro no cadastro!'))
socket.on("usuario-existente", () => alert('usuário já existente!'))

export default emiteCadastrarUsuario
