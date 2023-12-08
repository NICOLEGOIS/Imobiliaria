import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const database = new DatabaseMemory()
const server = fastify()

server.get('/', () => {
    return 'Rota padrão'
})

server.post('/aluguel', (request, reply) => {
// Acessando dados do corpo da requisição
    const {cordacasa, tamanho, precodoaluguel} = request.body
// Exibindo dados
//    console.log(body)
   
    // return 'cadastrar'
    database.create({
        cordacasa:  cordacasa,
        tamanho: tamanho,
        precodoaluguel: precodoaluguel,
    })

    return reply.status(201).send
})

server.get('/aluguel', (request) => {
    const search = request.query.search
    console.log(search)
    const aluguel = database.list(search)
    console.log(aluguel)
    return aluguel
})

server.put('/aluguel/:id', (request, reply) => {
    const aluguelId = request.params.id
    const { cordacasa, tamanho, precodoaluguel} = request.body
    const livro = database.update(aluguelId, {
        cordacasa: cordacasa,
        tamanho: tamanho,
        precodoaluguel: precodoaluguel,
    })
    return reply.status(204).send()
})

server.delete('/aluguel/:id', (request, reply) => {
    const aluguelId = request.params.id

    database.delete(aluguelId)

    return reply.status(204).send()
}) 

server.listen({
    port: 3333,
})