const conexoesDocumentos = []

function encontraConexao(nomeDocumento, nomeUsuario) {
    return conexoesDocumentos.find((conexao) => {
        return(
            conexao.nomeDocumento === nomeDocumento &&
            conexao.nomeUsuario === nomeUsuario
        )
    })
}

function adicionaConexao(conexao) {
    conexoesDocumentos.push(conexao)
}

function obtemUsuariosDocumento(nomeDocumento) {
    return conexoesDocumentos
        .filter((conexao) => conexao.nomeDocumento === nomeDocumento)
        .map((conexao) => conexao.nomeUsuario)

}

function removeConexao(nomeDocumento, nomeUsuario) {
    const indice = conexoesDocumentos.findIndex((conexao) => {
        return(
            conexao.nomeDocumento === nomeDocumento &&
            conexao.nomeUsuario === nomeUsuario
        )
    })

    if (indice !== -1) {
        conexoesDocumentos.splice(indice, 1)
    }
}

export { adicionaConexao, obtemUsuariosDocumento, removeConexao, encontraConexao }
