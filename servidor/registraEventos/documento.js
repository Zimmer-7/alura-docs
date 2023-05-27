import {
    atualizaDocumento,
    encontrarDocumento,
    excluirDocumento
} from "../db/documentosDb.js";
import { 
  adicionaConexao, 
  encontraConexao, 
  obtemUsuariosDocumento, 
  removeConexao 
} from "../utilidades/conexaoDocumentos.js";

function registraEventosDocumento(socket, io) {
    socket.on("selecionar_documento", async ({ nomeDocumento, nomeUsuario }, devolverTexto) => {
        const documento = await encontrarDocumento(nomeDocumento);
    
        if (documento) {
          const conexaoEncontrada = encontraConexao(nomeDocumento, nomeUsuario)

          if (!conexaoEncontrada) {
            socket.join(nomeDocumento);
  
            adicionaConexao({ nomeDocumento, nomeUsuario })

            socket.data = {
              usuarioEntrou: true
            }
  
            const usuariosNoDocumento = obtemUsuariosDocumento(nomeDocumento)
  
            io.to(nomeDocumento).emit("usuarios-no-documento", usuariosNoDocumento)
  
            devolverTexto(documento.texto);

          } else {
            socket.emit("usuario-ja-no-documento")
          }

        }

        socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
          const atualizacao = await atualizaDocumento(nomeDocumento, texto);
      
          if (atualizacao.modifiedCount) {
            socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
          }
  
      });
      
      socket.on("excluir_documento", async (nome) => {
          const resultado = await excluirDocumento(nome);
      
          if (resultado.deletedCount) {
            io.emit("excluir_documento_sucesso", nome);
          }
  
      });

      socket.on("disconnect", () => {
        if (socket.data.usuarioEntrou) {
          removeConexao(nomeDocumento, nomeUsuario)
  
          const usuariosNoDocumento = obtemUsuariosDocumento(nomeDocumento)
  
          io.to(nomeDocumento).emit("usuarios-no-documento", usuariosNoDocumento)
        }
        
      })

    });
    
}

export default registraEventosDocumento
