const filmesJson = require("./data/ghibli.json")

const express = require("express")
const { response } = require("express")

const app = express()

// linha usada para transformar todos os dados em Json
app.use(express.json())



app.get("/filmes", (request, response)=>{
    response.status(200).json({
        mensagem: "Nah credito?",
        data: filmesJson
})
})
// get por path params
app.get("/filmes/pesquisar/:id", (request, response)=>{
    console.log(request.params.id)
    let idRequest = request.params.id

    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

    console.log(filmeEncontrado)

    response.status(200).send(filmeEncontrado)

})
//get por query params
app.get("/filmes/pesquisar", (request, response)=>{
    console.log(request.query)
    let tituloRequest = request.query.titulo.toLowerCase()

    let filmeEncontrado = filmesJson.filter(
       // filme => filme.title.toLowerCase() == tituloRequest)
        filme => filme.title.toLowerCase().includes(tituloRequest))

    response.status(200).send(filmeEncontrado)

})

app.post("/filmes/cadastrar", (request, response)=>{
    let bodyRequest = request.body

    console.log(bodyRequest)

    let novoFilme = {
        id: bodyRequest.id,
        title: bodyRequest.title,
        description: bodyRequest.description
    }
    filmesJson.push(novoFilme)

    response.status(201).send({
        mensagem: "filme cadastrado com sucesso",
        data: novoFilme
    })



})


app.listen(3030, ()=>{
    console.log ("Tá na hora!")

})