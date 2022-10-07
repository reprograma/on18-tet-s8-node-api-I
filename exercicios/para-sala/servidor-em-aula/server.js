
const filmesJson = require("./data/ghibli.json")

const express = require("express")

const { request, response } = require("express")

const app = express()
app.use(express.json())




app.get("/filmes",(request, response) => {
    response.status(200).json({
        mensagem: "tá funcionando",
        data: filmesJson
    })
})


app.get("/filmes/:id",(request, response) =>{
    console.log(request.params.id)
    let idRequest = request.params.id
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    response.status(200).send(filmeEncontrado)

}) 

app.get("/filmes/pesquisar",(request, response) =>{
    let tituloRequeste = request.query.titulo.toLowerCase()
    let filmesEncontrado = filmesJson.filter(filme => filme.title.toLowerCase().includes(tituloRequeste))
    
    response.status(200).send(filmesEncontrado)
})

app.post("/filmes/cadrastrar",(require, response)=>{
    let bodyRequeste = request.body
    let novoFilme = {
        id: bodyRequeste,
        title: bodyRequeste.title,
        description: bodyRequeste.description     
    } 
    
    filmesJson.push(novoFilme)

    response.status(201).send({
     mensagem: "filme cadastrado com sucesso",
     data: novoFilme
    })
    

})

 
app.listen(3030,() => {
    console.log("Alô, Pepe moreno?")

})