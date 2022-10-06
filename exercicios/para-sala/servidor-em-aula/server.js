const filmesJson = require("./data/ghibli.json")
const { response } = require("express")
const express = require("express")
const app = express ()

app.get("/filmes", (request, response)=>{
    response.status(200).json({
        mensagem:"Tá funcionando",
        data: filmesJson
    })
})
app.get("/filmes/pesquisar/:id",(request,response)=> {
    console.log(request.params.id)
   let idRequest = request.params.id
    let filmeEncontrado = filmesJson.find(filme=> filme.id == idRequest)
    console.log(filmeEncontrado)
    response.status(200).send(filmeEncontrado)
})
app.get("/filmes/pesquisar", (request,response) =>{
    console.log(request.query)
   let tituloRequest = request.query.titulo.toLowerCase()

   let filmeEncontrado = filmesJson.filter(filme => filme.title.toLowerCase() .includes(tituloRequest))
   response.status(200).send(filmeEncontrado)
})

app.listen(3030, () => {
    console.log("Alô, pepe moreno?")
})