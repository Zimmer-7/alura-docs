import "dotenv/config";

import registraEventosCadastro from "./registraEventos/cadastro.js";
import registraEventosDocumento from "./registraEventos/documento.js";
import registraEventosInicio from "./registraEventos/inicio.js";
import registraEventosLogin from "./registraEventos/login.js";
import io from "./servidor.js";
import autorizaUsuario from "./middlewares/autorizaUsuario.js";

const nspUsuarios = io.of("/usuarios")

nspUsuarios.use(autorizaUsuario)

nspUsuarios.on("connection", (socket) => {
  registraEventosInicio(socket, nspUsuarios)
  registraEventosDocumento(socket, nspUsuarios)
  
})

io.on("connection", (socket) => {
  registraEventosCadastro(socket, io)
  registraEventosLogin(socket, io)
  
});
