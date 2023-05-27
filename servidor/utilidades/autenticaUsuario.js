import { scryptSync, timingSafeEqual } from 'crypto'

function autenticaUsuario(senhaDigitada, usuario){
    const hashTeste = scryptSync(senhaDigitada, usuario.sal, 64);

    const hashReal = Buffer.from(usuario.hash, "hex");

    const autenticacao = timingSafeEqual(hashTeste, hashReal);

    return autenticacao;
}

export default autenticaUsuario;
