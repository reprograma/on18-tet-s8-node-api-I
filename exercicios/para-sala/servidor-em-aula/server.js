const filmesJson = require("./data/ghibli.json")
// pegar os dados da pasta data/ghibli.json

const { response } = require("express")
const express = require("express")
const app = express()

// 
app.use(express.json())


app.get("/filmes", (request, response)=>{
    response.status(200).json({
// utlizar sempre 200= OK para funcionar o codigo 
        mensagem: "ta funcionando",
        data: filmesJson
    })
})

// get por Path Params
app.get("/filmes/pesquisar/:id", (request, response)=>{
// console.log(request.params.id)
    let idRequest = request.params.id

    //ARRAY.find(filme => filme.id == idRequest)
    // ARRAY.find(ELEMENTO => comparação)
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

// console.log(filmeEncontrado)

    response.status(200).send(filmeEncontrado)
})

// get por Query params
app.get("/filmes/pesquisar", (request, response)=>{
// console.log(request.query)
    let TituloRequest = request.query.titulo.toLowerCase()
    let filmeEncontrado = filmesJson.filter(
        filme => filme.title.toLowerCase().includes(TituloRequest))

        response.status(200).send(filmeEncontrado)

})

app.post("/filmes/cadastrar", (request, response)=> {
    let bodyRequest = request.body

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
    console.log("Alô, Pepe moreno?")
})
