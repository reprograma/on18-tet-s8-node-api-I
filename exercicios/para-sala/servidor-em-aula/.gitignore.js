const filmesJson = require("./data/ghibli.json")
const express = require("express")

const app = express()



app.get("/filmes", (request, response)=>{
    response.status(200).json({
        mensagem: "Ta funcionando",
        data: filmesJson
})})

app.listen(3030, ()=>{
    console.log ("Alê, Pepe moreno