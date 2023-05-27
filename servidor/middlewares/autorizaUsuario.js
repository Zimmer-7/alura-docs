import jwt from "jsonwebtoken"

function autorizaUsuario(socket, next) {
    const tokenJWT = socket.handshake.auth.token

    try {
        const payloadToken = jwt.verify(tokenJWT, process.env.SEGREDO_JWT)

        socket.emit("autorizacao-sucesso", payloadToken)

        next()
    } catch (erro) {
        next(erro)
    }
    
}

export default autorizaUsuario
