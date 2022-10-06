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
 
const filmesJson = require("./data/filmes.json");
const seriesJson = require("./data/series.json");
const express = require("express");
const app = express();

app.use(express.json());

app.get("/filmes", async (request, response)=>{
    let dadosFilmes = await bancoDeDados()
    response.status(200).json(filmeDesejado.filmes)
})

app.get("/filmes/pesquisar/:id", async (request, response)=>{
    try {
        let idRequest = request.params.id
        let dadosFilmes = await bancoDeDados()
        let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

        if(filmeEncontrado == undefined) throw new Error("Id não encontrado")
    
        response.status(200).send(filmeEncontrado)   

    } catch (error) {
        response.status(404).json({message: error.message})
    } 
})

app.get("/filmes/pesquisar", async (request, response)=>{
    try {
        let tituloRequest = await request.query.titulo.toLowerCase()
        let dadosFilmes = await bancoDeDados()
    
        let encontrarPorFilme = filmesJson.filter(filme => filme.Title.toLowerCase().includes(tituloRequest))
    
        if(encontrarPorFilme.length == 0) throw new Error("filme não encontrado")
        response.status(200).send(encontrarPorFilme) 
    } catch (error) {
        response.status(404).send({message: error.message})
    }
})

app.post("/filmes/cadastrar", async (request, response)=>{
    let bodyResquest = request.body
    let dadosFilmes = await bancoDeDados()

    let novoFilme = {
        id: bodyResquest.id,
        Title: bodyResquest.Title,
        description: bodyResquest.description
    }

    filmesJson.push(novoFilme)

    response.status(201).send({
        mensagem: "Filme cadastrado com sucesso!",
        data: novoFilme
    })
})

app.get("/series", async (request, response)=>{
    let dadosSeries = await bancoDeDados()
    response.status(200).json(serieDesejada.series)
})

app.get("/series/pesquisar/:id", async (request, response)=>{
    try {
        let idSerieRequest = request.params.id
        let dadosSeries = await bancoDeDados()
        let serieEncontrada = seriesJson.find(series => series.id == idSerieRequest)

        if(serieEncontrada == undefined) throw new Error("Id não encontrado")
    
        response.status(200).send(serieEncontrada)   

    } catch (error) {
        response.status(404).json({message: error.message})
    } 
})

app.get("/series/pesquisar", async (request, response)=>{
    try {
        let tituloSerieRequest = await request.query.titulo.toLowerCase()
        let dadosSeries = await bancoDeDados()
    
        let encontrarPorSeries = seriesJson.filter(series => series.title.toLowerCase().includes(tituloSerieRequest))
    
        if(encontrarPorSeries.length == 0) throw new Error("Serie não encontrado")
        response.status(200).send(encontrarPorSeries) 
    } catch (error) {
        response.status(404).send({message: error.message})
    }
})

app.post("/series/cadastrar", async (request, response)=>{
    let bodySerieResquest = request.body
    let dadosSeries = await bancoDeDados()

    let novaSerie = {
        id: bodySerieResquest.id,
        title: bodySerieResquest.title,
        description: bodySerieResquest.description
    }

   seriesJson.push(novaSerie)

    response.status(201).send({
        mensagem: "Serie cadastrado com sucesso!",
        data: novaSerie
    })
})

app.listen(9090, ()=>{
})
  