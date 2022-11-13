const { resolve } = require("path");

function bancoDeDados(){
    return new promises((resolve) =>{
        setTimeout(()=>{
            return resolve({
                series: require("./data/series.json"),
                filmes: require("./data/filmes.json")
            })
        }, 1500);
    })
}

const express = require("express");
const { request } = require("http");
const { response } = require("express");
const app = express()

app.use(express.json)

app.get("/filmes", async(request , resolve)=>{
    
    try {
        let dbFilmes = await bancoDeDados()
    if(!dbFilmes) {
        return response.status(404).send({
            "message": "Bad Request"
        })
    }

    response.status(200).send(dbFilmes.filmes)
    } catch (e) {
        console.error(e)
        
    }

})

app.get("/filmes/pesquisar", async(require,response)=>{
    try {
        let dbFilmes = await bancoDeDados()
    let tituloRequest = request.query.titulo.toLowerCase()

    let encontrarTitulo = dbFilmes.filmes.find(filme =>
        filme.Title.toLowerCase().includes(tituloRequest))

        if(encontrarTitulo.length == 0) throw new Error ("Filme não encontrado")
    response.status(200).send(encontrarTitulo)    

    } catch (error) {
        response.status(404).json({
            message: Error.message
        })
    }

})

app.get("/filmes/buscar" , async(request , response)=>{
    try {
        let dbFilmes = await bancoDeDados()
    let filmesJson = dbFilmes.filmes
    let params = request.query

    const chaves = Object.keys(params);

    const filtrando = filmesJson.filter((filme)=>{
        return chaves.some(key => RegExp(params[key], "i").test(filme[key].toString()))

    if(filtrando.length == 0) throw new Error("Filme não encontrado")

    response.status(200).send(filtrando)

    })
    } catch (error) {
        response.status(404).json({
            message: Error.message
        })
        
    }

})

app.get("/filmes/cadastrar", async(request , response)=>{
    let bobyRequest = request.body
    let dbFilmes =  await bancoDeDados()
    let filmes = dbFilmes.filmes

    let novoFilme = {
        id: (filme.length) + 1,
        title: bobyRequest.title,
        descricao: bobyRequest.descricao
    }

    filmes.puch(novoFilme)

    response.status(201).send({
        mensagem : "Filme cadastrado com sucesso",
        novoFilme
    })

})

app.get("/filmes/pesquisar/:id", async(request,response)=>{
    try {
        let idRequest = request.params.id
    let dbFilmes = await bancoDeDados()
    let filmeEncontrado = dbFilmes.filmes.find(filme =>
        filme.id == idRequest)
    if(filmeEncontrado== undefined) throw new Error("Id não encontrado. Tente novamente")   
    } catch (error) {
        response.status(404).json({message: error.message})
        
    } 

    response.status(200).send(filmeEncontrado)

})

app.get("/series", async(request,response)=>{
    let dbSeries = await bancoDeDados()

    response.status(200).send(dbSeries.series)

})

app.listen(1322, ()=>{
    console.log("Servidor rodando " + 1322)
})