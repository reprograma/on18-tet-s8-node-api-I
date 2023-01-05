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
  
const express = require ("express")
const app = express()
app.use(express.json())

app.get("/filmes", async (request, response) => {
    let bdFilmes = await bancoDeDados()
    response.status(200).send(bdFilmes.filmes)
})

app.get("/series", async (request, response) => {
    let bdSeries = await bancoDeDados()
    response.status(200).send(bdSeries.series)
})

app.get("/filmes/pesquisar/:id", async(request, response) => {
   try {
       let idRequest = request.params.id
       let bdFilmes = await bancoDeDados()
       let encontrarFilmePorId = bdFilmes.filmes.find(filme => filme.id == idRequest)
       response.status(200).send(encontrarFilmePorId)

   } catch (error) {
       response.status(404).json({message: error.message})
   }
})

app.get("/series/pesquisar/:id", async (request, response) => {
   try {
       let idRequest = request.params.id
       let bdSeries = await bancoDeDados()
       let encontrarSeriesPorId = bdSeries.series.find(serie => serie.id == idRequest)
       response.status(200).send(encontrarSeriesPorId)

   } catch (error) {
       response.status(404).json({message: error.message})
   }
})

app.get("/filmes/pesquisar", async (request, response) => {
   try {
       let bdFilmes = await bancoDeDados()
       let tituloRequest = request.query.titulo.toUpperCase()
       let encontrarPorTitulo = bdFilmes.filmes.filter(
           filme => filme.Title.toUpperCase().includes(tituloRequest))

       if(encontrarPorTitulo.length == 0) throw new Error("filme não encontrado")
       response.status(200).send(encontrarPorTitulo)
   } catch (error) {
       response.status(404).json({message: error.message})

   }
})

app.get("/series/pesquisar", async (request, response) => {
    try {
        let bdSeries = await bancoDeDados()
        let seriesRequest = request.query.titulo.toUpperCase()
        let encontrarPorTitulo = bdSeries.series.filter(
            filme => filme.title.toUpperCase().includes(seriesRequest))
            if(encontrarPorTitulo.length == 0) throw new Error("série não encontrada")
        response.status(200).send(encontrarPorTitulo)

    } catch (error) {

        response.status(404).json({message: error.message})
    }
})

app.post("/filmes/cadastrar", async (request, response) => {
    let bodyRequest = request.body
    let dbFilmes = await bancoDeDados()
    let filmes = dbFilmes.filmes

    let novoFilme = {
        id:(filmes.length)+1,
        Title: bodyRequest.Title,
        Year: bodyRequest.Year,
        Rated: bodyRequest.Rated,
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

    filmes.push(novoFilme)

    response.status(201).send({
        mensagem: "Filme cadastrado com sucesso!",
        novoFilme
    })
})

app.post("/series/cadastrar", async (request, response) => {
    let bodyRequest = request.body
    let dbSeries = await bancoDeDados()
    let series = dbSeries.series

    let novaSerie = {
    "id": (series.length)+1,
    "title": bodyRequest.title,
    "totalSeasons": bodyRequest.totalSeasons,
    "genre": [
        bodyRequest.genre,
    ],
    "writers": [
        bodyRequest.writers,
    ],
    "poster": bodyRequest.poster,
    "actors": [
        bodyRequest.actors,
    ],
    "ratings": {
        "rating": bodyRequest.rating.likes,
        "likes": bodyRequest.rating
    }
}
    series.push(novaSerie)

    response.status(201).send({
        mensagem: "Série cadastrada com sucesso!",
        novaSerie
    })
})

app.listen(4040,() => {
    console.log("Está funcionando")
})