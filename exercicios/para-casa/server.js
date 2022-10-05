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

app.get("/filmes/pesquisa/:id", async (request, response) =>{
    let dados= await bancoDeDados()
    let idRequest = request.params.id
    let filmeEncontrado = dados.filmes.find((filme) => filme.id == idRequest)

    response.status(200).send(filmeEncontrado)  
})

app.post("/filmes/cadastrar", async(request, response)=>{
    let dados = await bancoDeDados()
    let bodyRequest = request.body
    
    let novoFilme = {
        id:bodyRequest.id,
        Title: bodyRequest.title,
        Year:bodyRequest.Year ,
        Rated:bodyRequest.Rated,
        Released: bodyRequest.Released,
        Runtime:bodyRequest.Runtime,
        Genre:bodyRequest.Genre,
        Director:bodyRequest.Director,
    }

    dados.filmes.push(novoFilme)

    response.status(201).send({
        mensagem: "filme cadastrado com sucesso",
        data: novoFilme
    })
})

//series

app.get("/series", async (request, response)=>{
    let dados = await bancoDeDados()

    response.status(200).send(dados.series)
})

app.get("/series/pesquisa", async (request, response)=>{
    let dados = await bancoDeDados()
    let tituloRequest = request.query.titulo.toLowerCase()
    let serieEncontrada = dados.series.filter(serie => serie.title.toLowerCase().includes(tituloRequest))

    response.status(200).send(serieEncontrada)
    console.log(serieEncontrada)
})

app.get("/series/pesquisa/:id", async (request, response) =>{
    let dados= await bancoDeDados()
    let idRequest = request.params.id
    let serieEncontrada = dados.series.find((serie)=> serie.id == idRequest)

    response.status(200).send(serieEncontrada)  
})

app.post("/series/cadastrar", async(request, response)=>{
    let dados = await bancoDeDados()
    let bodyRequest = request.body

    let novaSerie = {
        id: bodyRequest.id,
        title:bodyRequest.title,
        totalSeasons:bodyRequest.totalSeasons,
        genre:bodyRequest.genre,
        writers:bodyRequest.writers,
    }

    dados.series.push(novaSerie)

    response.status(201).send({
        mensagem: "Série cadastrado com sucesso",
        data: novaSerie
    })
   
    
})


app.listen(8030,()=>{
    console.log("Bora pro segundo turno")
})