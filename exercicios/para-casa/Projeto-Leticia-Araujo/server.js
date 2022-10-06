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
  
// chamar/invocar o arquivo de filmes
const filmesjson = require("./data/filmes.json")
const seriesjson = require("./data/series.json")

// início/invocando a api
const express = require("express");
const { request, response } = require("express");

// execeutar o express
const app = express()

// parser do body em json = transforma o body em json
app.use(express.json())

app.get("/filmes", async (request, response)=>{
    let listaFilmes = await bancoDeDados()

    response.status(200).json([{
        mensagem: "Catálogo de Filmes",
        data: listaFilmes.filmes
    }])
});

// // GET PARAMS FILMES
app.get("/filmes/pesquisar/:id", async (request, response)=>{
    try{

    let idRequest = request.params.id
    let listaFilmes = await bancoDeDados()
    
    let filmesEncontrados = listaFilmes.filmes.find(filme => filme.id == idRequest)
       
    if(filmesEncontrados == undefined) throw new Error("id não encontrado")

    response.status(200).send(filmesEncontrados)

} catch (error) {
        response.status(404).json({message: error.message})
    }
});

// // QUERY PARAMS FILMES 
app.get("/filmes/pesquisar", async (request, response)=>{
    try{
    
    let listaFilmes = await bancoDeDados()
    let tituloRequest = request.query.titulo.toLowerCase()
    
    let filmesPorTitulo = listaFilmes.filmes.filter(filme => filme.Title.toLowerCase().includes(tituloRequest))

    console.log(filmesPorTitulo)

    if(filmesPorTitulo.length == 0) throw new Error("filme não encontrado")

    response.status(200).send(filmesPorTitulo)
    
} catch (error) {
        response.status(404).json({message: error.message})
    }
});

// CADASTRAR NOVO FILME
app.post("/filmes/cadastrar", async (request, response)=>{
    let bodyRequest = request.body
    let listaFilmes = await bancoDeDados()
    let filmes = listaFilmes.filmes

    console.log(filmes.length)
    
    let filmeNovo = {
        id: (filmes.length)+1,
        title: bodyRequest.title,
        genre: bodyRequest.genre,
        year: bodyRequest.year
    }

    filmes.push(filmeNovo)

    response.status(201).send({
         menssagem:"Filme cadastrado com sucesso", 
         filmeNovo
    })
});

// // SERIES

app.get("/series", async (request, response)=>{
    let listaSeries = await bancoDeDados()
        
    response.status(200).send([{
    mensagem: "Catálogo de Series",
    data: listaSeries.series
    }])
});

// // GET PARAMS 
app.get("/series/pesquisar/:id", async (request, response)=>{
    try {

    let idRequest = request.params.id
    let listaSeries = await bancoDeDados()
    
    let seriesEncontradas = listaSeries.series.find(serie => serie.id == idRequest)
        
    if(seriesEncontradas == undefined) throw new Error("id não encontrado")
    
    response.status(200).send(seriesEncontradas)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
});
// //  QUERY PARAMS
app.get("/series/pesquisar", async (request, response)=>{
    
    try {
    
        let listaSeries = await bancoDeDados()
        let tituloRequest = request.query.titulo.toLowerCase()
        
        let seriesPortitulo = listaSeries.series.filter(serie => serie.title.toLowerCase().includes(tituloRequest))
    
        console.log(seriesPortitulo)
    
        if(seriesPortitulo.length == 0) throw new Error("serie não encontrada!")
    
        response.status(200).send(seriesPortitulo)
        
    } catch (error) {
            response.status(404).json({message: error.message})
        }
    });     

//  CADASTRAR NOVA SERIE
app.post("/series/cadastrar", async (request, response)=>{
    let bodyRequest = request.body
    let listaSeries = await bancoDeDados()
    let series = listaSeries.series

    console.log(series.length)

    let serieNova = {
        id: (series.length)+1,
        title: bodyRequest.title,
        totalSeasons: bodyRequest.totalSeasons,
        genre: bodyRequest.genre
    }

    series.push(serieNova)

    response.status(201).send({
        mensagem: "Serie cadastrada com sucesso!",
        serieNova
    })
});

// iniciar servidor
app.listen(8014, ()=>{
    console.log("servidor rodando ok!")
})


  