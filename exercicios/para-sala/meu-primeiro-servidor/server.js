// invocando o express no nosso arquivo
const { request, response } = require("express")
const express = require("express")

// executar o express
const app = express()

app.get("/", (request, response)=>{
    response.status(200).json(["JS é muito legal"])
})

app.get("/oi", (request, response)=>{
    response.status(200).json([{
        mensagem: "oi coisa linda"
    }])
})

//iniciando o servidor
// SEMPRE NO FINAL (pq primeiro pega as rotas e dps inicia)
app.listen(8081, () =>{
    console.log("servidor rodando lindo bonito e legal!")
})