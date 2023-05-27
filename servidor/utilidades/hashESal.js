import { randomBytes, scryptSync } from 'crypto'

function criaHashESal(senha) {
    const sal = randomBytes(16).toString("hex")
    const hash = scryptSync(senha, sal, 64).toString("hex")

    return { sal, hash }

}

export default criaHashESal