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

app.use(express.json())

/* para os filmes */

app.get("/filmes", async (request, response)=>{
    let dbFilmes = await bancoDeDados()

    response.status(200).send(dbFilmes.filmes)
})


app.get("/filmes/pesquisar/:id", async (request, response)=>{
    try{
        let dbFilmes = await bancoDeDados()
        let idRequest = request.params.id

        let filmeEncontrado = dbFilmes.filmes.find(filme => filme.id == idRequest)
        console.log(filmeEncontrado)

        if(filmeEncontrado == undefined) throw new Error("id não encontrado")

        response.status(200).send(filmeEncontrado)

    } catch(error) {
        response.status(404).send({message: error.message})
    }
})


app.get("/filmes/pesquisar", async (request, response)=>{
    try{
        let dbFilmes = await bancoDeDados()
        let tituloRequest = request.query.titulo.toLowerCase()
        let filmes = dbFilmes.filmes

        let encontrarPorTitulo = filmes.filter(filme => filme.Title.toLowerCase().includes(tituloRequest))
        console.log (encontrarPorTitulo)

        if(encontrarPorTitulo.length == 0) throw new Error("filme não encontrado")

        response.status(200).send(encontrarPorTitulo)

    } catch (error){
        response.status(404).send({message: error.message})
    }
})

/* app.get("/filmes/pesquisar?filtrados") */

app.post("/filmes/cadastrar", async (request, response)=> {
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
        message:"Filme cadastrado com sucesso!",
        novoFilme
    })
})


/* para as séries */

app.get("/series", async (request, response)=>{
    let dbFilmes = await bancoDeDados()

    response.status(200).send(dbFilmes.series)
})


app.get("/series/pesquisar/:id", async (request, response)=>{
    try{
        let dbFilmes = await bancoDeDados()
        let idRequest = request.params.id

        let serieEncontrada = dbFilmes.series.find(serie => serie.id == idRequest)
        console.log(serieEncontrada)

        if(serieEncontrada == undefined) throw new Error("id não encontrado")

        response.status(200).send(serieEncontrada)

    } catch(error) {
        response.status(404).send({message: error.message})
    }
})


app.get("/series/pesquisar", async (request, response)=>{
    try{
        let dbFilmes = await bancoDeDados()
        let tituloRequest = request.query.titulo.toLowerCase()
        let series = dbFilmes.series

        let encontrarPorTitulo = series.filter(serie => serie.title.toLowerCase().includes(tituloRequest))
        console.log (encontrarPorTitulo)

        if(encontrarPorTitulo.length == 0) throw new Error("Série não encontrada")

        response.status(200).send(encontrarPorTitulo)

    } catch (error){
        response.status(404).send({message: error.message})
    }
})

/* app.get("/series/pesquisar?filtrados") */


app.post("/series/cadastrar", async (request, response)=> {
    let bodyRequest = request.body
    let dbFilmes = await bancoDeDados()
    let series = dbFilmes.series

    let novaSerie = {
        id:(series.length)+1,
        title: bodyRequest.title,
        totalSeasons: bodyRequest.totalSeasons,
        genre: bodyRequest.genre,
        writers: bodyRequest.writers,
        poster: bodyRequest.poster,
        actors: bodyRequest.actors,
        ratings: {
            rating: bodyRequest.ratings.rating,
            likes: bodyRequest.ratings.likes
        } 
    }

    series.push(novaSerie)

    response.status(201).send({
        message:"Série cadastrado com sucesso!",
        novaSerie
    })
})












app.listen(8082, ()=>{
    console.log("servidor rodando")
})
  