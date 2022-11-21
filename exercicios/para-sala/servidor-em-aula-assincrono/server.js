//simulação do banco de dados

function bancoDeDados(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            return resolve ({
                filmes: require("./data/ghibli.json")
            })
        }, 1500);
    })
}

const { response } = require("express");
//começando o nosso servidor

const express = require ("express")
const app = express()

app.use (express.json()) // parse do body em json

//começando a codarrr
app.listen(1313, ()=>{
    console.log("fé no pai que a api saiii bebê")
})

app.get("/filmes", async (request,response) =>{
    let dbFilmes = await bancoDeDados()
    response.status(200).send(dbFilmes.filmes)
})