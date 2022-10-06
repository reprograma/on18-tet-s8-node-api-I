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
const { response } = require("express")
const app = express()

app.use(express.json())


app.get("/filmes/pesquisar",async (request,response) => {
    let dbFilmes = await bancoDeDados()
    response.status(200).send(dbFilmes.filmes)
 })
 
 app.get("/filmes/pesquisar/:id", async (request, response) =>{

     try {
     let dbFilmes = await bancoDeDados()
     let idRequest = request.params.id
 
     let filmeEncontrado = dbFilmes.filmes.find(filme => filme.id == idRequest)
     response.status(200).send(filmeEncontrado)

     if(filmeEncontrado == undefined) throw new Error({mensagem:"Filme não encontrado no catálogo"})
    }catch(error){
        response.status(404).send(error.mensagem)
    }

 })
 

 app.get("/filmes/pesquisar", async (request, response) =>{
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

 
 app.post("/filmes/cadastrar", (request, response) =>{
     let bodyRequest = request.body
     
     let novoFilme = {
         id: (filmes.length)+1,
         title: bodyRequest.title,
         description: bodyRequest.description
     }
 
     filmesJson.push(novoFilme)
 
     response.status(201).send({
         mensagem: "filme cadastrado com sucesso",
         novoFilme
     })
 })

 app.get("/series/pesquisar",async (request,response) => {
    let dbSeries = await bancoDeDados()
    response.status(200).send(dbSeries.seriesJson)
 })
 
 app.get("/series/pesquisar/:id", async (request, response) =>{
     let dbSeries = await bancoDeDados()
     let idRequest = request.params.id
 
     let filmeEncontrado = dbSeries.seriesJson.find(serie => serie.id == idRequest)
     response.status(200).send(filmeEncontrado)
 })
 

 app.get("/series/pesquisar/", async (request, response) =>{
     let dbSeries = await bancoDeDados()
     let tituloRequest = request.query.titulo.toLowerCase()
 
     let tituloEncontrado = dbSeries.series.filter(serie => serie.Title.toLowerCase().includes(tituloRequest))
     response.status(200).send(tituloEncontrado)
 })

 app.post("/series/cadastrar", (request, response) =>{
    let bodyRequest = request.body
    
    let novaSerie = {
        id: (series.length)+1,
        title: bodyRequest.title,
        description: bodyRequest.description,
        novaSerie
    }

    filmesJson.push(novaSerie)

    response.status(201).send({
        mensagem: "filme cadastrado com sucesso",
        data: novaSerie
    })
})



app.listen(5055, () => {
    console.log("Tudo ok e rodando")
})
