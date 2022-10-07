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
  

const { response, request } = require("express")
const express = require("express")
const app = express()

app.use(express.json())


app.get("/filmes", async(Request,Response) =>{
    let buscaFilmes = await bancoDeDados()
    Response.status(200).send(buscaFilmes.filmes)
    
})

app.get("/filmes/:id", async (request, response)=>{

    try {
        let idRequest = request.params.id
        let buscarFilmes = await bancoDeDados()
    
        let encontrarFilmes = buscarFilmes.filmes.find( filme => filme.id == idRequest)

        if(encontrarFilmes == undefined) throw new Error("id não encontrado")

        response.status(200).send(encontrarFilmes)
        
    } catch (error) {
        response.status(404).json({message: error.message})
    }
})


app.get("/filmesbuscar", async (Request, Response)=>{
    try {
        let buscarFilmes = await bancoDeDados()
        let tituloRequest = Request.query.Title.toLowerCase()

        let encontrarPorTitulo = buscarFilmes.filmes.filter(filme => filme.Title.toLowerCase().includes(tituloRequest))

        console.log(encontrarPorTitulo)

        if(encontrarPorTitulo.length == 0) throw new Error("filme não encontrado")
        

        Response.status(200).send(encontrarPorTitulo)
    } catch (error) {
        Response.status(404).json({message: error.message})
    }
})

app.post("/filmescadastrar", async (Request, Response)=>{
    let bodyRequest = Request.body
    let cadrastroFilmes = await bancoDeDados()
    let filmes = cadrastroFilmes.filmes

    console.log(filmes.length)

    let cadastrarFilme = {
        Id:(filmes.length)+1,
        Title: bodyRequest.title,
        Description: bodyRequest.description
    }

    filmes.push(cadastrarFilme)

    Response.status(200).send({
        mensagem : "filme cadastrado com sucesso" ,
        filmes
    })
})




//pesquisar series

app.get("/series", async(Request,Response) =>{
    let buscaSeries = await bancoDeDados()
    Response.status(200).send(buscaSeries.series)
    
})

app.get("/series/:id", async (request, response)=>{

    try {
        let idRequest = request.params.id
        let buscarseries = await bancoDeDados()
    
        let encontrarseries = buscarseries.series.find( serie => serie.id == idRequest)

        if(encontrarseries == undefined) throw new Error("id não encontrado")

        response.status(200).send(encontrarseries)
        
    } catch (error) {
        response.status(404).json({message: error.message})
    }
})

app.get("/seriesbuscar", async (request, response)=>{
    try{
        let buscaSeries = await bancoDeDados()
        let tituloRequest = request.query.Title.toLowerCase()
        let buscarSeriesPorTitulo = buscaSeries.series.filter((serie)=> serie.title.toLowerCase().includes(tituloRequest))
        response.status(200).json(buscarSeriesPorTitulo)

    } catch(error){
        response.status(404).json({message: error.message})
    }

} )

app.get("/seriesbuscartudo", async (request, response)=>{
    try{
        let buscaSeries = await bancoDeDados()
        let tituloRequest = request.query.title
        let buscarSeriesPorTitulo = buscaSeries.series.filter((serie)=> serie.title.toLowerCase().includes(tituloRequest))
        response.status(200).json(tituloRequest)

    } catch(error){
        response.status(404).json({message: error.message})
    }

} )


app.post("/seriescadastrar", async (Request, Response)=>{
    let bodyRequest = Request.body
    let cadrastroSeries = await bancoDeDados()
    let series = cadrastroSeries.series

    console.log(series.length)

    let cadastrarSeries = {
        Id:(series.length)+1,
        Title: bodyRequest.title,
        Description: bodyRequest.description
    }

    series.push(cadastrarSeries)

    Response.status(200).send({
        mensagem : "serie cadastrado com sucesso" ,
        series
    })
})


app.listen ( 1414,  ( ) => {
    console.log ( "Resolução da atividade" )
} )