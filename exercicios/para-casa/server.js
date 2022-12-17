
console.log("nosso codigo aqui")
const filmesJson = require("./data/ghibli.json")
const express = require("express")
const app = express()

app.get("/filmes", (request, response) =>{
    response.status(200).json({
        mensagem: "Rota ok!",
        data: filmesJson
})
})
// get por path params
app.get("/filmes/pesquisar/:id", (request, response) =>{
    let idRequest = request.params.id
    //ARRAY.find(ELEMENTO =>comparação)
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

    response.status(200).send(filmeEncontrado)
})

// get por query params
app.get("/filmes/pesquisar", (request, response) =>{
    console.log(request.query)
    let tituloRequest = request.query.titulo.toLowerCase()
    let filmeEncontrado = filmesJson.filter(
        filme => filme.title.toLowerCase().includes(tituloRequest))

    response.status(200).send(filmeEncontrado)
})

app.post("/filmes/cadastrar", (request, response)=>{
    let bodyRequest = request.body

    let novoFilme = {
        id: bodyRequest.id,
        title: bodyRequest.title,
        description: bodyRequest.description
    }

    filmesJson.push(novoFilme)

    response.status(201).send({
        mensagem: "Filme cadastrado com sucesso",
        data: novoFilme
    })
})

app.listen(3030, ()=>{
    console.log("servidor iniciado")
})