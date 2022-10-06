const { request } = require("express")
const express = require("express")

const app = express()

app.get("/", (request, response)=>{
    response.status(200).json(["JS é muito legal."])
})

app.listen(8080, ()=> {
    console.log ("Servidor rodando lindo como eu!")
})

app.get("/oi", (request, response)=>{
    response.status(200).json([{
        mensagem: "Oi coisa linda de Gabi."
    }])
    
})