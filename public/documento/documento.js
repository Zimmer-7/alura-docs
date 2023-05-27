import {
  emitirExcluirDocumento,
  emitirTextoEditor,
  selecionarDocumento,
} from "./socket-documento.js";

const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get("nome");

const textoEditor = document.getElementById("editor-texto");
const tituloDocumento = document.getElementById("titulo-documento");
const botaoExcluir = document.getElementById("excluir-documento");
const listaUsuariosConectados = document.getElementById("usuarios-conectados")

tituloDocumento.textContent = nomeDocumento || "Documento sem título";

function trataAutorizacaoSucesso(payloadToken) {
  selecionarDocumento({ nomeDocumento, nomeUsuario: payloadToken.nomeUsuario });

}

function atualizaInterfaceUsuarios(usuariosNoDocumento) {
  listaUsuariosConectados.innerHTML = ""

  usuariosNoDocumento.forEach((usuario) => {
    listaUsuariosConectados.innerHTML += `
      <li class="list-group-item">${usuario}</li>
    `;
  })
}

textoEditor.addEventListener("keyup", () => {
  emitirTextoEditor({
    texto: textoEditor.value,
    nomeDocumento,
  });
});

function atualizaTextoEditor(texto) {
  textoEditor.value = texto;
}

botaoExcluir.addEventListener("click", () => {
  emitirExcluirDocumento(nomeDocumento);
});

function alertarERedirecionar(nome) {
  if (nome === nomeDocumento) {
    alert(`Documento ${nome} excluído!`);
    window.location.href = "/";
  }
}

export { 
  atualizaTextoEditor, 
  alertarERedirecionar, 
  trataAutorizacaoSucesso, 
  atualizaInterfaceUsuarios 
};
