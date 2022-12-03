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


//app.get("/filmes/pesquisar/:id", (request, response)=>{
    //let idRequest = request.params.id
    //let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)

    //response.status(200).send(filmeEncontrado)
//})

//começa o nosso servidor

const express = require("express")
const app = express()

//parser do body em json
app.use(express.json())

// lista de filmes
app.get("/filmes", async (request, response)=>{
    let dbFilmes = await bancoDeDados()
    response.status(200).send(dbFilmes.filmes)
})

// pesquisar por id
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

app.get("/filmes/pesquisar", async (request, response)=>{
    try {
        let dbFilmes = await bancoDeDados()
        let tituloRequest = request.query.titulo.toLowerCase()
        let encontrarPorTitulo = dbFilmes.filmes.filter(filme => filme.Title.toLowerCase().includes(tituloRequest))
        console.log(encontrarPorTitulo)
        if(encontrarPorTitulo.length == 0) throw new Error("filme não encontrado")


        response.status(200).send(encontrarPorTitulo)
    } catch (error) {
        response.status(404).json({message: error.message})
    }
})

app.post("/filmes/cadastrar", async (request, response)=>{
    let bodyRequest = request.body
    let dbFilmes = await bancoDeDados()
    let filmes = dbFilmes.filmes

    console.log(filmes.length)

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

// series

// lista de series
app.get("/series", async (request, response)=>{
    let dbSeries = await bancoDeDados()
    response.status(200).send(dbSeries.series)
})

// pesquisar por id
app.get("/series/pesquisar/:id", async (request, response)=>{

    try {
        let idRequest = request.params.id
        let dbSeries = await bancoDeDados()
        let serieEncontrada = dbSeries.series.find( serie => serie.id == idRequest)
        if(serieEncontrada == undefined) throw new Error("id não encontrado")
        response.status(200).send(serieEncontrada)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
})

app.get("/series/pesquisar", async (request, response)=>{
    try {
        let dbSeries = await bancoDeDados()
        let tituloRequest = request.query.titulo.toLowerCase()
        let encontrarPorTitulo = dbSeries.series.filter(serie => serie.title.toLowerCase().includes(tituloRequest))
        console.log(encontrarPorTitulo)
        if(encontrarPorTitulo.length == 0) throw new Error("serie não encontrada")


        response.status(200).send(encontrarPorTitulo)
    } catch (error) {
        response.status(404).json({message: error.message})
    }
})

app.post("/series/cadastrar", async (request, response)=>{
    let bodyRequest = request.body
    let dbSeries = await bancoDeDados()
    let series = dbSeries.series

    console.log(series.length)

    let novaSerie = {
        id:(series.length)+1,
        title: bodyRequest.title,
        description: bodyRequest.description
    }

    series.push(novaSerie)
    response.status(201).send({
        mensagem: "serie cadastrada com sucesso",
        novaSerie
    })

})


app.listen(7070, ()=>{
    console.log("deu certo isso que importa")
})
  
  