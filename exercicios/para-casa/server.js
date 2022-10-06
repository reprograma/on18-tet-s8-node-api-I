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

const express = require("express")
const app = express()

// Transformar todos os dados enviados em Jason
app.use(express.json())

const filmesJson = require("./data/filmes.json")
const seriesJson = require("./data/series.json")

app.get("/filmes", async (request, response)=>{
    let dbFilmes = await bancoDeDados()
    response.status(200).send(dbFilmes.filmes)
})

//POR ID
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

//POR TITULO
app.get("/filmes/pesquisar", async (request, response)=>{
    try {
        let dbFilmes = await bancoDeDados()
        let tituloRequest = request.query.titulo.toLowerCase()
        let encontrarPorTitulo = dbFilmes.filmes.filter(filme => filme.Title.toLowerCase().includes(tituloRequest))

        if(encontrarPorTitulo.length < 1) throw new Error("filme não encontrado")
        
        response.status(200).send(encontrarPorTitulo)
    } catch (error) {
        response.status(404).json({message: error.message})
    }
})

//CADASTRAR FILME
app.post("/filmes/cadastrar", async (request, response)=>{
    let bodyRequest = request.body
    let dbFilmes = await bancoDeDados()
    let filmes = dbFilmes.filmes

    let novoFilme = {
        id:(filmes.length)+1,
        title: bodyRequest.title,
        description: bodyRequest.description
    }
    filmes.push(novoFilme)

    response.status(201).send({
        mensagem: "filme cadastrado com sucesso",
        novoFilme
    })
})
//TODAS AS SERIES
app.get("/series", async (request, response)=>{
    let dbSeries = await bancoDeDados()
    response.status(200).send(dbSeries.series)
})
//SERIE POR ID
app.get("/series/pesquisar/:id", async (request, response)=>{
    try {
        let idRequest = request.params.id
        let dbSeries = await bancoDeDados()
        let serieEncontrada = dbSeries.series.find(serie => serie.id == idRequest)

        if(serieEncontrada == undefined) throw new Error("id não encontrado")

        response.status(200).send(serieEncontrada)
        
    } catch (error) {
        response.status(404).json({message: error.message})
    }
})
//SERIE POR TITULO
app.get("/series/pesquisar", async (request, response)=>{
    try {
        let dbSeries = await bancoDeDados()
        let tituloRequest = request.query.titulo.toLowerCase()
        let encontrarPorTitulo = dbSeries.series.filter(serie => serie.title.toLowerCase().includes(tituloRequest))

        if(encontrarPorTitulo.length < 1) throw new Error("série não encontrada")
        
        response.status(200).send(encontrarPorTitulo)
    } catch (error) {
        response.status(404).json({message: error.message})
    }
})
//CADASTRAR NOVA SÉRIE
app.post("/series/cadastrar", async (request, response)=>{
    let bodyRequest = request.body
    let dbSeries = await bancoDeDados()
    let series = dbSeries.series

    let novaSerie = {
        id:(series.length)+1,
        title: bodyRequest.title,
        description: bodyRequest.description
    }
    series.push(novaSerie)

    response.status(201).send({
        mensagem: "série cadastrada com sucesso",
        novaSerie
    })
})
app.listen(3333, ()=>{
    console.log("Tudo ok")
})