const express = require("express")

const app = express()

app.get("/", (request, response)=>{
    response.status(200).json(["JS é legal"])

})

app.get ("/oi", (request,response)=>{
    response.status(200).json([{
        mensagem: "olá"
    }])
})

app.listen(8080, ()=>{
    console.log("servidor rodando")
})
