function bancoDeDados() {
    return new Promise((resolve)=>{
        setTimeout(() => {
            return resolve({
                series: require("./data/series.json"),
                filmes: require("./data/filmes.json")
            })
                
        }, 1500);
    })
}
  
const { response } = require("express");
const express = require("express");
const { request } = require("http");
const app = express()

app.use(express.json())

app.get("/filmes", async (request, response)=>{
    let dados = await bancoDeDados()

    response.status(200).send(dados.filmes)
})

app.get("/filmes/pesquisa", async (request, response)=>{
    let dados = await bancoDeDados()
    let tituloRequest = request.query.titulo.toLowerCase()
    let filmeEncontrado = dados.filmes.filter(filme => filme.Title.toLowerCase().includes(tituloRequest))

    response.status(200).send(filmeEncontrado)
    console.log(filmeEncontrado)
})


app.get("/filmes/pesquisar/:id", async (request, response)=>{

    try {
        let idRequest = request.params.id
        let dbFilmes = await bancoDeDados()

        let filmeEncontrado = dbFilmes.filmes.find( filme => filme.id == idRequest)

        if(filmeEncontrado == undefined) throw new Error("id não encontrado")

        response.status(200).send(filmeEncontrado)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
})