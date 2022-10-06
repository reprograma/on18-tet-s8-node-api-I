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

const { request, response } = require("express");
const express = require("express")
const app = express()

// parser do body em JSON
app.use(express.json())


//SERIES

app.get("/series", async (request, response) => {
    let dbSeries = await bancoDeDados()
    response.status(200).send(dbSeries.series)
})

app.get("/series/pesquisar/:id", async (resquest, response) => {

    try {
        let dbSeries = await bancoDeDados()
        let idResquest = resquest.params.id

        let buscarSeriePorId = dbSeries.series.find(series => series.id == idResquest)

        console.log(buscarSeriePorId)

        if (buscarSeriePorId == undefined) throw new Error("ID não encontrado")

        response.status(200).send(buscarSeriePorId)

    } catch (error) {
        response.status(500).json({ message: error.message })
    }

})

app.get("/series/pesquisar", async (request, response) => {
    try {
        let dbSeries = await bancoDeDados()
        let tituloRequest = request.query.titulo.toLowerCase()

        let buscarSeriePorTitulo = dbSeries.series.filter(series => series.title.toLowerCase().includes(tituloRequest))

        if (buscarSeriePorTitulo == undefined) throw new Error("Serie não encontrada")

        response.status(200).send(buscarSeriePorTitulo)

    } catch (error) {
        response.status(500).json({ message: error.message })
    }
})

app.post("/series/cadastrar", async (request, response) => {
    try {
        let dbSeries = await bancoDeDados()
        let bodyRequest = request.body

        let novaSerie = {
            id: bodyRequest.id,
            title: bodyRequest.title,
            totalSeasons: bodyRequest.totalSeasons,
            genre: bodyRequest.genre,
            writers: bodyRequest.writers,
            poster: bodyRequest.poster,
            actors: bodyRequest.actors
            // ratings: bodyRequest.ratings,
        }

        dbSeries.series.push(novaSerie)

        if (
            bodyRequest.id == 0 ||
            bodyRequest.id == 0 ||
            bodyRequest.title == 0 ||
            bodyRequest.totalSeasons == 0 ||
            bodyRequest.genre == 0 ||
            bodyRequest.writers == 0 ||
            bodyRequest.poster == 0 ||
            bodyRequest.actors == 0 
        ) throw new Error("Não foi possível cadastrar uma nova série, preencha todos os campos solicitados!")

        response.status(201).send({
            message: "Nova serie cadastrada com sucesso!",
            data: novaSerie
        })
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
})


//FILMES

app.get("/filmes", async (request, response) => {
    let dbFilmes = await bancoDeDados()
    response.status(200).send(dbFilmes.filmes)
})

app.get("/filmes/pesquisar/:id", async (resquest, response) => {

    try {
        let idResquest = resquest.params.id
        let dbFilmes = await bancoDeDados()

        let buscarfilmePorId = dbFilmes.filmes.find(filme => filme.id == idResquest)

        console.log(buscarfilmePorId)

        if (buscarfilmePorId == undefined) throw new Error("ID não encontrado")

        response.status(200).send(buscarfilmePorId)

    } catch (error) {
        response.status(500).json({ message: error.message })
    }
})

app.get("/filmes/pesquisar", async (request, response) => {
    try {
        let dbFilmes = await bancoDeDados()
        let tituloFilmeRequest = request.query.titulo.toLowerCase()

        let buscarFilmePorTitulo = dbFilmes.filmes.filter(filme => filme.Title.toLowerCase().includes(tituloFilmeRequest))

        if (buscarFilmePorTitulo.length == 0) throw new Error("Filme não encontrado")

        response.status(200).send(buscarFilmePorTitulo)

    } catch (error) {
        response.status(500).json({ message: error.message })
    }
})

// app.get("/filmes/cv", async (request, response) => {
//     try {
//         let dbFilmes = await bancoDeDados()
//         let BuscaCompletaRequest = request.query
//         // let chave = dbFilmes.filmes.keys()
//         // let valores = dbFilmes.filmes.values()

//         // let filmeEncontrado = dbFilmes.filmes.filter(filme => filme.keys.values.toLowerCase().includes(BuscaCompletaRequest))

//         if (BuscaCompletaRequest == dbFilmes.filme.values() || BuscaCompletaRequest == db.filmes.filme.keys()) {
//             response.status(200).send(BuscaCompletaRequest)
//         }

//         if (filmeEncontrado == 0) throw new Error("Nenhum filme foi encontrado")

//         response.status(200).send(BuscaCompletaRequest)

//     } catch (error) {
//         response.status(500).json({ message: error.message })
//     }
// })

app.post("/filmes/cadastrar", async (request, response) => {

    try {
        let dbFilmes = await bancoDeDados()
        let bodyRequest = request.body

        let novoFilme = {
            id: bodyRequest.id,
            Title: bodyRequest.Title,
            Year: bodyRequest.Year,
            Released: bodyRequest.Released,
            Runtime: bodyRequest.Runtime,
            Genre: bodyRequest.Genre,
            Director: bodyRequest.Director,
            Writer: bodyRequest.Writer,
            Actors: bodyRequest.Actors,
            Plot: bodyRequest.Plot,
            Language: bodyRequest.Language,
            Country: bodyRequest.Country,
            Awards: bodyRequest.Awards
        }

        dbFilmes.filmes.push(novoFilme)

        if (
            bodyRequest.id == 0 ||
            bodyRequest.Title == 0 ||
            bodyRequest.Year == 0 ||
            bodyRequest.Released == 0 ||
            bodyRequest.Runtime == 0 ||
            bodyRequest.Genre == 0 ||
            bodyRequest.Director == 0 ||
            bodyRequest.Writer == 0 ||
            bodyRequest.Plot == 0 ||
            bodyRequest.Language == 0 ||
            bodyRequest.Country == 0 ||
            bodyRequest.Awards == 0
        ) throw new Error("Não foi possível cadastrar um novo filme, preencha todos os campos solicitados!")

        response.status(201).send({
            message: "Filme cadastrado com sucesso!",
            data: novoFilme
        })
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
})

app.listen(1111, () => {
    console.log("Rodando servidor")
})