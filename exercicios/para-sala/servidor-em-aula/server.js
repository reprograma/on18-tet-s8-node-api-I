const filmesJson = require("./data/ghibli.json")

const express = require("express")
const app = express()

//linha usada para transformar todos os dados enviados (body) em json
app.use(express.json())

app.get("/filmes", (request, response) => {
    response.status(200).json({
    mensagem: "Está funcionando",
    data: filmesJson
    })
})

// GET por Path Params
app.get("/filmes/pesquisar/:id", (request, response) => {
    let idRequest = request.params.id
    console.log(idRequest)

    const pesquisarId = filmesJson.find((filme) => filme.id == idRequest)
    console.log(pesquisarId)

    response.status(200).send(pesquisarId)
})

// GET por Query Params
app.get("/filmes/pesquisar", (request, response) => {
    console.log(request.query)

    let tituloRequest = request.query.titulo.toLowerCase()
    
    let pesquisarTitulo = filmesJson.filter(
        filme => filme.title.toLowerCase().includes(tituloRequest)) //encontra o titulo do filme em letra minúscula e com apenas 1 palavra

    response.status(200).send(pesquisarTitulo)
})

app.post("/filmes/cadastrar", (request, response) => {
    let bodyRequest = request.body

    console.log(bodyRequest)

    let novoFilme = {
        id: bodyRequest.id,
        title:bodyRequest.title,
        description: bodyRequest.description
    }

    filmesJson.push(novoFilme)

    response.status(201).send({
        mensagem: "Filme cadastrado com sucesso!",
        data: novoFilme
    })
})

app.listen(3030, (request, response) => {
    console.log("Novo servidor em aula rodando")
})