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

const filmesJson = require("./data/filmes.json")
const seriesJson = require("./data/series.json")

app.use(express.json())


app.get("/filmes", async (request, response)=>{
    let listaFilmes = await bancoDeDados()

response.status(200).send([{
    mensagem: "Menu de Filmes",
    data: listaFilmes.filmes
}])
});

app.get("/filmes/pesquisar/:id", async (request, response)=>{

    try {

    let idRequest = request.params.id
    let listaFilmes = await bancoDeDados()

    let filmeEncontrado = listaFilmes.filmes.find(filme => filme.id == idRequest)

    if(filmeEncontrado == undefined) throw new Error("id não encontrado")

    response.status(200).send(filmeEncontrado)

    } catch (error) {
        response.status(404).json({message: error.message})
    }

});

app.get("/filmes/pesquisar", async (request, response)=>{

    try {

        let listaFilmes = await bancoDeDados()
        let tituloRequest = request.query.titulo.toLowerCase()

        let filmeEncontradoPorTitulo = listaFilmes.filmes.filter(filme => filme.Title.toLowerCase().includes(tituloRequest))

        console.log(filmeEncontradoPorTitulo)

        if (filmeEncontradoPorTitulo.length == 0) throw new Error("filme não encontrado")

        response.status(200).send(filmeEncontradoPorTitulo)

    } catch (error) {
        response.status(404).json({message: error.message})
    }


});


app.post("/filmes/cadastrar", async (request, response)=>{
    let bodyRequest = request.body
    let listaFilmes = await bancoDeDados()
    let filmes = listaFilmes.filmes

    console.log(filmes.length)

    let novoFilme = {
        id: (filmes.length)+1,
        title: bodyRequest.title,
        description: bodyRequest.description
    }

    filmes.push(novoFilme)

    response.status(201).send({
        mensagem: "Filme cadastrado com sucesso!",
        novoFilme
    })

});

app.get("/series", async (request, response)=>{
    let listaseries = await bancoDeDados()

response.status(200).send([{
    mensagem: "Menu de Series",
    data: listaseries.series
}])
});


app.get("/series/pesquisar/:id", async (request, response)=>{

    try {

    let idRequest = request.params.id
    let listaSeries = await bancoDeDados()

    let serieEncontrada = listaSeries.series.find(serie => serie.id == idRequest)

    if(serieEncontrada == undefined) throw new Error("id não encontrado")

    response.status(200).send(serieEncontrada)

    } catch (error) {
        response.status(404).json({message: error.message})
    }

});

app.get("/series/pesquisar", async (request, response)=>{

    try {

        let listaSeries = await bancoDeDados()
        let tituloRequest = request.query.titulo.toLowerCase()

        let serieEncontradaPorTitulo = listaSeries.series.filter(serie => serie.title.toLowerCase().includes(tituloRequest))

        console.log(serieEncontradaPorTitulo)

        if (serieEncontradaPorTitulo.length == 0) throw new Error("serie não encontrado")

        response.status(200).send(serieEncontradaPorTitulo)

    } catch (error) {
        response.status(404).json({message: error.message})
    }


});


app.post("/series/cadastrar", async (request, response)=>{
    let bodyRequest = request.body
    let listaSeries = await bancoDeDados()
    let series = listaSeries.series

    console.log(series.length)

    let novaSerie = {
        id: (series.length)+1,
        title: bodyRequest.title,
        description: bodyRequest.description
    }

    series.push(novaSerie)

    response.status(201).send({
        mensagem: "Serie cadastrada com sucesso!",
        novaSerie
    })

});


app.listen(4040, ()=>{
    console.log("Servidor funcionando!")
})
  