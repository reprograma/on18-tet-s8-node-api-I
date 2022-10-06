// invocando o express no nosso arquivo
const { request } = require("express")
const express = require("express")

// executar o express
const app = express()

// Nossa primeira rota = GET
//[express][METODO]("/ROTA", (REQUISIÇÃO, RESPOSTA)={})
app.get("/", (request, response)=>{
    //RESPONSE.STATUS(XXXX).JSON()
    response.status(200).json(["JS é muito legal"])
})

// exemplo
app.get("/oi", (request, response)=>{
    response.status(200).json([{
        mensagem: "oi coisa linda"
    }])
})

// iniciando o servidor
// SEMPRE NO FINAL
app.listen(8080, ()=>{
    console.log("servidor rodando lindo bonito e legal!")
})