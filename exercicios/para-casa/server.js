//adiciona express ao js atual
const express = require("express")
const app = express()

//simulação de banco de dados para assincronicidade
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
//rota 1A: filmes
//adiciona todo o banco de dados para a mesma variavel
//chama apenas .filmes
//exibe o conteúdo completo do json "filmes"
app.get("/filmes", async(request,response) => {
    let dbFilmesSeries = await bancoDeDados()
    response.status(200).send(dbFilmesSeries.filmes)
})
//rota 1B: series
//exibe o conteúdo completo do json "series"
app.get("/series", async(request,response) => {
    let dbFilmesSeries = await bancoDeDados()
    response.status(200).send(dbFilmesSeries.series)
})
//rota 2A: filmes
//retorna filmes por ID (param)
app.get("/filmes/pesquisar/:id", async(request, response) =>{
    let idRequest = request.params.id
    let dbFilmesSeries = await bancoDeDados()
    let filmeEncontrado = dbFilmesSeries.filmes.find(filmes => filmes.id == idRequest)
    
    response.status(200).send(filmeEncontrado)
})
//Rota 2B: séries
//retorna séries por ID (param)
app.get("/series/pesquisar/:id", async(request, response) =>{
    let idRequest = request.params.id
    let dbFilmesSeries = await bancoDeDados()
    let serieEncontrada = dbFilmesSeries.series.find(series => series.id == idRequest)
    
    response.status(200).send(serieEncontrada)
})

//Rota 3A: filmes
//Retorna filmes por título (query)
app.get("/filmes/pesquisar/c/titulo", async(request, response) =>{
    try{
    let dbFilmesSeries = await bancoDeDados()
    let tituloRequest = request.query.titulo
    let undef
    console.log(tituloRequest)
    let filmeEncontrado = dbFilmesSeries.filmes.find(
       filmes => filmes.Title.toLowerCase() == tituloRequest.toLowerCase())
       if(filmeEncontrado == undef) throw new Error("Filme não encontrado")
    
    
    response.status(200).send(filmeEncontrado)
    }catch (error){
        response.status(404).send({message: error.message})
    }
})
//Rota 3B: séries
//Retorna séries por título (query)
app.get("/series/pesquisar/c/titulo", async(request, response) =>{
    try{
    let dbFilmesSeries = await bancoDeDados()
    let tituloRequest = request.query.titulo
    let undef
    let serieEncontrada = dbFilmesSeries.series.find(
        series => series.title.toLowerCase() == tituloRequest.toLowerCase())
      if(serieEncontrada == undef) throw new Error("série não encontrada")
    
    response.status(200).send(serieEncontrada)
}catch (error){
    response.status(404).send({message: error.message})
}
})

//Rota 4A: filmes
//Retorna filmes por título parcial (param)
app.get("/filmes/pesquisar/p/:titulo", async(request, response) =>{
    try{
    let dbFilmesSeries = await bancoDeDados()
    let tituloParcial = request.params.titulo
    let buscaTituloParcial = dbFilmesSeries.filmes.filter(filmes => filmes.Title.toLowerCase().includes(tituloParcial))
    if(buscaTituloParcial == false) throw new Error("filme não encontrado")
    response.status(200).send(buscaTituloParcial)
    
}catch (error){
    response.status(404).json({message: error.message})
}
})
//Rota 4B: séries
//Retorna séries por título parcial (param)
app.get("/series/pesquisar/p/:titulo", async(request, response) =>{
    try{
    let dbFilmesSeries = await bancoDeDados()
    let tituloParcial = request.params.titulo
    let buscaTituloParcial = dbFilmesSeries.series.filter(series => series.title.toLowerCase().includes(tituloParcial))
    if(buscaTituloParcial == false) throw new Error("série não encontrada")

    response.status(200).send(buscaTituloParcial)
}catch (error){
    response.status(404).send({message: error.message})
}
})
//-----------------------------------------
//listen sempre por ultimo, abre o servidor
//para operações através da porta 8080
app.listen(8080, ()=>{
    console.log("Servidor online")
})