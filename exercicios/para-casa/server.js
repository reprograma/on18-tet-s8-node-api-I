function bancoDeDados() {
    return new Promise((resolve) => {
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

app.get("/filmes", async (request, response) => {
    const dbFilmes = await bancoDeDados()

    response.status(200).send(dbFilmes.filmes)
})

app.get("/filmes/:id", async (request, response) => {
    let requestId = request.params.id
    let dbFilmes = await bancoDeDados()

    let buscarFilme = dbFilmes.filmes.find(filme => filme.id == requestId)

    if (buscarFilme == undefined) return response.status(404).send("Filme não encontrado")

    response.status(200).send(buscarFilme)
})

app.get("/filmes/buscar/:titulo", async (request, response) => {
    const dbFilmes = await bancoDeDados()
    let tituloFilmeRequest = request.params.titulo.toLowerCase()

    let buscarFilme = dbFilmes.filmes.filter(filme => filme.Title.toLowerCase().includes(tituloFilmeRequest))

    if (buscarFilme.length == 0) return response.status(404).send("Filme não encontrado")

    response.status(200).send(buscarFilme)
})

app.use(express.json())

app.post("/filmes", async (request, response) => {
    let dbFilmes = await bancoDeDados()
    let bodyRequest = request.body

    let novoFilme = {
        id: bodyRequest.id,
        Title: bodyRequest.Title,
        Year: bodyRequest.Year,
        Language: bodyRequest.Language,
        Country: bodyRequest.Country,
        Awards: bodyRequest.Awards
    }

    if (
        bodyRequest.id == 0 ||
        bodyRequest.Title == 0 ||
        bodyRequest.Year == 0 ||
        bodyRequest.Language == 0 ||
        bodyRequest.Country == 0 ||
        bodyRequest.Awards == 0
    ) return response.status(400).send("Preencha todos os campos para adicionar um filme")

    dbFilmes.filmes.push(novoFilme)

    response.status(201).send({
        message: "Filme cadastrado com sucesso!",
        data: novoFilme
    })
})

app.get("/series", async (request, response) => {
    const dbSeries = await bancoDeDados()

    response.status(200).send(dbSeries.series)
})

app.get("/series/:id", async (request, response) => {
    let requestId = request.params.id
    let dbSeries = await bancoDeDados()

    let buscarSerie = dbSeries.series.find(serie => serie.id == requestId)

    if (buscarSerie == undefined) return response.status(404).send("Serie não encontrado")

    response.status(200).send(buscarSerie)
})

app.get("/series/buscar/:titulo", async (request, response) => {
    const dbSeries = await bancoDeDados()
    let tituloSerieRequest = request.params.titulo.toLowerCase()

    let buscarSerie = dbSeries.series.filter(serie => serie.title.toLowerCase().includes(tituloSerieRequest))

    if (buscarSerie.length == 0) return response.status(404).send("serie não encontrado")

    response.status(200).send(buscarSerie)
})

app.post("/series", async (request, response) => {
    let dbSeries = await bancoDeDados()
    let bodyRequest = request.body

    let novaSerie = {
        id: bodyRequest.id,
        title: bodyRequest.title,
        genre: bodyRequest.genre
    }

    if (
        bodyRequest.id == 0 ||
        bodyRequest.title == 0 ||
        bodyRequest.genre == 0
    ) return response.status(400).send("Preencha todos os campos para adicionar um serie")

    dbSeries.series.push(novaSerie)

    response.status(201).send({
        message: "Serie cadastrado com sucesso!",
        data: novaSerie
    })
})

app.listen(3030, () => {
    console.log("Servidor Iniciado")
})
