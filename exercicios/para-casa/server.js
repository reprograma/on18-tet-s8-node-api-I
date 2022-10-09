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

// PARA FILMES
app.get("/filmes", async (request, response) => {
    let dbFilmes = await bancoDeDados()

    response.status(200).send(dbFilmes.filmes)
})

// por Path params
app.get("/filmes/pesquisar/:id", async (request, response) => {
    try {
        let idRequest = request.params.id
        let dbFilmes = await bancoDeDados()
    
        let pesquisarId = dbFilmes.filmes.find((filme) => filme.id == idRequest)
        console.log(pesquisarId)

        if(pesquisarId == undefined) throw new Error("id do filme não encontrado")

        response.status(200).send(pesquisarId)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
})

// por Query params
app.get("/filmes/pesquisar", async (request, response) => {
    try {
        let tituloRequest = request.query.titulo.toLowerCase()
        let dbFilmes = await bancoDeDados()
        
        let pesquisarTitulo = dbFilmes.filmes.filter((filme) => filme.Title.toLowerCase().includes(tituloRequest))

        if(pesquisarTitulo.length == 0) throw new Error("Filme não encontrado")

        response.status(200).send(pesquisarTitulo)
    } catch (error) {
        response.status(404).json({message: error.message})
    }
})

// para pesquisar por chave/valor (incompleto)

app.get("/filmes/buscar", async (request, response) => {
    try {
        
        let dbFilmes = await bancoDeDados()
        let filmesJson = dbFilmes.filmes
        let parametros = request.query

        //console.log(parametros)

        const chaves = Object.keys(parametros)

        //console.log(chaves)
        
        const filtrarFilmes = filmesJson.filter((filme) => {
            return chaves.some(key => RegExp(parametros[key], 'i').test(filme[key].toString()));
        })

        if(filtrarFilmes.length == 0) throw new Error("Filme não encontrado")

        response.status(200).send(filtrarFilmes)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
})

// cadastrar novo filme
app.post("/filmes/cadastrar", async (request, response) => {

    let bodyRequest = request.body
    let dbFilmes = await bancoDeDados()

    let filmes = dbFilmes.filmes

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
})


// PARA SERIES
app.get("/series", async (request, response) => {
    let dbSeries = await bancoDeDados()

    response.status(200).send(dbSeries.series)
})

// por Path params
app.get("/series/pesquisar/:id", async (request, response) => {
    try {
        let idRequest = request.params.id
        let dbSeries = await bancoDeDados()
    
        let pesquisarId = dbSeries.series.find(serie => serie.id == idRequest)
        console.log(pesquisarId)

        if(pesquisarId == undefined) throw new Error("id da série não encontrado")

        response.status(200).send(pesquisarId)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
})

// por Query params
app.get("/series/pesquisar", async (request, response) => {
    try {
        let tituloRequest = request.query.titulo.toLowerCase()
        let dbSeries = await bancoDeDados()
        
        let pesquisarTitulo = dbSeries.series.filter((serie) => serie.title.toLowerCase().includes(tituloRequest))

        if(pesquisarTitulo.length == 0) throw new Error("Série não encontrada")

        response.status(200).send(pesquisarTitulo)
    } catch (error) {
        response.status(404).json({message: error.message})
    }
})

// buscar series por chave/valor 
app.get("/series/buscar", async (request, response) => {
    try {
        
        let dbSeries = await bancoDeDados()
        let seriesJson = dbSeries.series
        let parametros = request.query

        //console.log(parametros)

        const chaves = Object.keys(parametros)

        //console.log(chaves)
        
        const filtrarSeries = seriesJson.filter((serie) => {
            return chaves.some(key => RegExp(parametros[key], 'i').test(serie[key].toString()));
        })

        if(filtrarSeries.length == 0) throw new Error("Série não encontrada")

        response.status(200).send(filtrarSeries)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
})

// cadastrar nova série
app.post("/series/cadastrar", async (request, response) => {
    let bodyRequest = request.body
    let dbSeries = await bancoDeDados()

    let series = dbSeries.series

    console.log(series.length)

    let novaSerie = {
        id: (series.length)+1,
        title: bodyRequest.title,
    }

    series.push(novaSerie)

    response.status(201).send({
        mensagem: "Série cadastrada com sucesso!",
        novaSerie
    })
})

//iniciando o servidor com a porta 3030
app.listen(3030, () => {
    console.log("Servidor funcionando corretamente")
})
  
  