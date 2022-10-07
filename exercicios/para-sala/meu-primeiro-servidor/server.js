



const filmesJson = require("./data/ghibli.json")


const { response, request } = require("express")
const express = require("express")
const app = express()

app.get("/", (request, response)=>{
    response.status(200).json(["JS é muito legal!"])
})

app.get("/filmes",(request, response)=>{
    response.status(200).json({
        mensagem: "ta funcionando",
        data: filmesJson
    })
})

app.listen(8080, ()=>{
    console.log("Servidor rondando")
})

