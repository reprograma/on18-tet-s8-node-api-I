function bancoDeDados() {
    return new Promise((resolve)=>{
        setTimeout(() => {
            return resolve({
                series: require("./data/series.json"),
                filmes: require("./data/filmes.json")
            })
                
        }, 100);
    })
}

const { response } = require("express");
const express = require("express");
const app = express()

//Pegar FILMES
    //Filmes por PATH PARAMS (requisitando por params)
        //ID
        app.get("/filmes/id/:id", async (request, response) =>{
            let banco = await bancoDeDados()
            let filmeIdRequest = request.params.id;
            let filmeEncontrado = banco.filmes.find(filme =>
                filme.id == filmeIdRequest)
            
            response.status(200).send(filmeEncontrado)
        })
        //Title
        app.get("/filmes/title/:Title", async (request, response) =>{
            let banco = await bancoDeDados();
            let filmeTitleRequest = request.params.Title;
            let filmeEncontrado = banco.filmes.find(filme => 
                filme.Title.toLowerCase().includes(filmeTitleRequest.toLowerCase()))
            
            response.status(200).send(filmeEncontrado)
        })

    //Filmes por QUERIES PARAMS (requisitando por query)
        app.get("/filmes/query", async (request,response) =>{
            let requestItem = request.query.item;
            let banco = await bancoDeDados();

            let filmeEncontrado = banco.filmes.filter(filme => 
                filme.Title.toLowerCase().includes(requestItem.toLowerCase()))

            response.status(200).send(filmeEncontrado)
        })
    //Séries por PATH PARAMS (requisitando por params)
        //ID
        app.get("/series/id/:id", async (request, response) =>{
            let seriesID = request.params.id;
            let banco = await bancoDeDados();

            let serieEscolhida = banco.series.find(serie =>
                serie.id == seriesID)

            response.status(200).send(serieEscolhida)
        })
        //Title
        app.get("/series/title/:title", async (request, response) =>{
            let seriesTitle = request.params.title;
            let banco = await bancoDeDados();

            let serieEscolhida = banco.series.filter(serie=>
                serie.title.toLowerCase().includes(seriesTitle.toLowerCase()))

            response.status(200).send(serieEscolhida)
        })

app.listen(8080,()=>{
    console.log("Lulala! Brilha uma estrela!")
})