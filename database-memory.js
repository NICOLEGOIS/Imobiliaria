import { randomUUID } from "crypto"

export class DatabaseMemory{
#aluguel = new Map()

list(search){
    return Array.from(this.#aluguel.entries()).map((aluguelArray) =>{
    // acessando primeira posição
        const id = aluguelArray[0]
        const data = aluguelArray[1]

        return{
            id,
            ...data
        }
    })
    .filter(aluguel => {
        if (search){
            return aluguel.titulo.includes(search)
        }
        return true
    })
}
create(aluguel){
    const aluguelId = randomUUID()
    this.#aluguel.set(aluguelId, aluguel)
}
update(id, aluguel){
    this.#aluguel.set(id, aluguel)
}
delete(id, aluguel){
    this.#aluguel.delete(id, aluguel)
}
}