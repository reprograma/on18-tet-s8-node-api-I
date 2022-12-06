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

app.use(express.json())

//busca todos os filmes
app.get("/filmes", async (request, response) => {
    let bancoFilmes = await bancoDeDados()
    response.status(200).send(bancoFilmes.filmes)
})

//busca todas as séries
app.get("/series", async (request, response) => {
    let bancoSeries = await bancoDeDados()
    response.status(200).send(bancoSeries.series)
})

//busca filme por ID
app.get("/filmes/pesquisar/:id", async (request, response) => {
    try {
        let idRequest = request.params.id
        let bancoFilmes = await bancoDeDados()
        let filmeEncontrado = bancoFilmes.filmes.find(filme => filme.id == idRequest)
        if (filmeEncontrado == undefined) throw new Error("id não encontrado")
        response.status(200).send(filmeEncontrado)
    } catch (error) {
        response.status(404).json({ message: error.message })
    }
})

//busca série por ID
app.get("/series/pesquisar/:id", async (request, response) => {
    try {
        let idRequest = request.params.id
        let bancoSeries = await bancoDeDados()
        let serieEncontrada = bancoSeries.series.find(serie => serie.id == idRequest)
        if (serieEncontrada == undefined) throw new Error("id não encontrado")
        response.status(200).send(serieEncontrada)
    } catch (error) {
        response.status(404).json({ message: error.message })
    }
})

//busca filme por titulo
app.get("/filmes/pesquisar", async (request, response) => {
    try {
        let bancoFilmes = await bancoDeDados()
        let tituloRequest = request.query.titulo.toLowerCase()
        let filmeEncontradoPorTitulo = bancoFilmes.filmes.filter(filme => filme.Title.toLowerCase().includes(tituloRequest))
        if (filmeEncontradoPorTitulo.length == 0) throw new Error("filme não encontrado")
        response.status(200).send(filmeEncontradoPorTitulo)
    } catch (error) {
        response.status(404).json({ message: error.message })
    }
})

//busca série por titulo
app.get("/series/pesquisar", async (request, response) => {
    try {
        let bancoSeries = await bancoDeDados()
        let tituloRequest = request.query.titulo.toLowerCase()
        let serieEncontradaPorTitulo = bancoSeries.series.filter(serie => serie.title.toLowerCase().includes(tituloRequest))
        if (serieEncontradaPorTitulo.length == 0) throw new Error("série não encontrada")
        response.status(200).send(serieEncontradaPorTitulo)
    } catch (error) {
        response.status(404).json({ message: error.message })
    }
})

//busca filme por chave/valor
app.get("/filmes/buscar", async (request, response) => {
    try {
        let bancoFilmes = await bancoDeDados()
        let filmeJson = bancoFilmes.filmes
        let parametros = request.query
        const chaves = Object.keys(parametros)
        const filtrado = filmeJson.filter((filme) => {
            return chaves.some(key => RegExp(parametros[key], 'i').test(filme[key].toString()));
        })
        if (filtrado.length == 0) throw new Error("filme não encontrado")
        response.status(200).send(filtrado)
    } catch (error) {
        response.status(404).json({ message: error.message })
    }
})

//busca série por chave/valor
app.get("/series/buscar", async (request, response) => {
    try {
        let bancoSeries = await bancoDeDados()
        let serieJson = bancoSeries.series
        let parametros = request.query
        const chaves = Object.keys(parametros)
        const filtrado = serieJson.filter((serie) => {
            return chaves.some(key => RegExp(parametros[key], 'i').test(serie[key].toString()));
        })
        if (filtrado.length == 0) throw new Error("série não encontrada")
        response.status(200).send(filtrado)
    } catch (error) {
        response.status(404).json({ message: error.message })
    }
})

app.listen(4040, () => {
    console.log("Bem vindes ao Graziflix...")
})