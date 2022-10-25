//invocando o express no nosso arquivo
const express = require("express")

const app = express()

app.get("/", (request, response)=>{
    response.status(200).json(["JS é muito legal! uhul somos backenderss"])
})


app.get("/oi", (request, response)=>{
    response.status(200).json([{mensagem: "oi coisa linda"}])
})



app.listen(8080, ()=> {
    console.log("servidor rodando lindo e legal!!")
})