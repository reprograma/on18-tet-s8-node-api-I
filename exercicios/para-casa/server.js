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

// transforma os bodies em JSon
app.use(express.json())


// ACOES EM FILMES
// buscando todos os filmes
app.get("/filmes", async (request, response)=>{
    let dbFilmesESeries = await bancoDeDados()

    response.status(200).send(dbFilmesESeries.filmes)
})

// buscando por id
app.get("/filmes/pesquisar/:id", async (request, response)=>{ 
    try {        
        let dbFilmesESeries = await bancoDeDados()
        let dbFilmes = dbFilmesESeries.filmes
        let idRequest = request.params.id

        let filmeEcontrado = dbFilmes.find(filme => filme.id == idRequest)

        if(filmeEncontrado == undefined) throw new Error("id não encontrado")

        response.status(200).send(filmeEcontrado)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
})  

// buscando por nome
app.get("/filmes/pesquisar/:title", async (request, response)=>{ 
    try {
        let dbFilmesESeries = await bancoDeDados()
        let dbFilmes = dbFilmesESeries.filmes
        let titleRequest = request.params.title

        let filmeEcontrado = dbFilmes.find(filme => filme.title == titleRequest)

        if(filmeEncontrado == undefined) throw new Error("titulo não encontrado")

        response.status(200).send(filmeEcontrado)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
})

// buscando por qualquer chave/valore
// app.get("/filmes/pesquisar", async (request, response)=>{
//         let dbFilmesESeries = await bancoDeDados()
//         let dbFilmes = dbFilmesESeries.filmes
//         let anyRequest = request.query.toLowerCase()   
        
//     function filtrarPorAnyRequest (anyRequest){
//         if (dbFilmes.key().toLowerCase().includes(anyRequest) || dbFilmes.value().toLowerCase().includes(anyRequest))
//         return dbFilmes.filme
//     }

//         let filmesEcontrados = dbFilmes.filter(filtrarPorAnyRequest);
//         filmesEcontrados.forEach(filme => {
//             console.log(filme)
//         })
        
//         // console.log(filmesEncontrados)
//         response.status(200).send(filmesEncontrados)})


// postando novo filme
app.post("/filmes/cadastrar", async (request, response)=>{
    let bodyRequest = request.body
    let dbFilmesESeries = await bancoDeDados()
    let dbFilmes = dbFilmesESeries.filmes

    console.log(dbFilmes.length)

    let novoFilme = {
        id:(dbFilmes.length)+1,
        title: bodyRequest.title,
        description: bodyRequest.description
    }

    filmes.push(novoFilme)

    response.status(201).send({
        mensagem: "filme cadastrado com sucesso",
        novoFilme
    })

})


//  ACOES EM SERIES

// Buscando todas as series
app.get("/series", async (request, response)=>{
    let dbFilmesESeries = await bancoDeDados()

    response.status(200).send(dbFilmesESeries.series)
})

// buscando por id
app.get("/series/pesquisar/:id", async (request, response)=>{ 
    try {
        let dbFilmesESeries = await bancoDeDados()
        let dbSeries = dbFilmesESeries.series
        let idRequest = request.params.id

        let serieEcontrada = dbSeries.find(serie => serie.id == idRequest)

        if(serieEcontrada == undefined) throw new Error("id não encontrado")

        response.status(200).send(serieEcontrada)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
})


// buscando por nome
app.get("/series/pesquisar/:title", async (request, response)=>{ 
    try {
        let dbFilmesESeries = await bancoDeDados()
        let dbSeries = dbFilmesESeries.series
        let titleRequest = request.params.title

        let serieEcontrada = dbSeries.find(serie => serie.title == titleRequest)

        if(serieEcontrada == undefined) throw new Error("titulo não encontrado")

        response.status(200).send(serieEcontrada)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
})
  

// tentativa de buscar por qualquer chave ou value
// app.get("/series/pesquisar", async (request, response)=>{
//     try {
//         let dbFilmesESeries = await bancoDeDados()
//         let anyRequest = request.query.titulo.toLowerCase()
//         let dbSeries = dbFilmesESeries.series

//     function filtrarPorChaveOuValue(anyRequest) {
//         if ( dbSeries.key().toLowerCase().includes(anyRequest) || dbSeries.value().toLowerCase().includes(anyRequest)) {
//             return dbSeries.serie;
//         } 
//     }

//         var seriesEncontradas = dbSeries.filter(filtrarPorChaveOuValue);
//         seriesEncontradas.forEach(serie => { 
//             console.log(serie);
//         })

//         // let buscarPorQualquerTermo = dbFilmesESeries.series.filter(serie => serie.key().toLowerCase().includes(anyRequest) || serie.value().toLowerCase().includes(anyRequest))

//         // console.log(buscarPorQualquerTermo)

//         if(encontrarPorTitulo.length == 0) throw new Error("filme não encontrado")
        
//         response.status(200).send(seriesEncontradas)
//     } catch (error) {
//         response.status(404).json({message: error.message})
//     }
// })

// postando nova serie
app.post("/series/cadastrar", async (request, response)=>{
    let bodyRequest = request.body
    let dbFilmesESeries = await bancoDeDados()
    let dbSeries = dbFilmesESeries.series

    console.log(dbSeries.length)

    let novaSerie = {
        id:(dbSeries.length)+1,
        title: bodyRequest.title,
        description: bodyRequest.description
    }

    series.push(novaSerie)

    response.status(201).send({
        mensagem: "filme cadastrado com sucesso",
        novaSerie
    })

})

app.listen(5050, ()=>{
    console.log("Ja chegou o disco voador!")
})
