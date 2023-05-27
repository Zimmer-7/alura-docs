import { 
  alertarERedirecionar, 
  atualizaInterfaceUsuarios, 
  atualizaTextoEditor, 
  trataAutorizacaoSucesso 
} from "./documento.js";
import { obtemCookie } from "../utilidades/cookie.js";

const socket = io("/usuarios", {
  auth: {
    token: obtemCookie("tokenJWT")
  }
});

socket.on("autorizacao-sucesso", trataAutorizacaoSucesso)

socket.on("connect_error", (erro) => {
  alert(erro)
  window.location.href = "/login/index.html"
})

function selecionarDocumento(dadosEntrada) {
  socket.emit("selecionar_documento", dadosEntrada, (texto) => {
    atualizaTextoEditor(texto);
  });
}

socket.on("usuario-ja-no-documento", () => {
  alert('documento já aberto em outra página')
  window.location.href = "/"
})

socket.on("usuarios-no-documento", atualizaInterfaceUsuarios)

function emitirTextoEditor(dados) {
  socket.emit("texto_editor", dados);
}

socket.on("texto_editor_clientes", (texto) => {
  atualizaTextoEditor(texto);
});

function emitirExcluirDocumento(nome) {
  socket.emit("excluir_documento", nome);
}

socket.on("excluir_documento_sucesso", (nome) => {
  alertarERedirecionar(nome);
});

export { emitirTextoEditor, selecionarDocumento, emitirExcluirDocumento };
