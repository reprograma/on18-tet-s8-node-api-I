const express = require ("express")

//executar 
const app = express()
//fazer em routes na arquitetura MVC
app.get("/", (request, response)=>{
    response.status(200).json(["JS é muito legal uhuuul somos backenderssss"]) 
})

app.post("/oi", (request, response)=>{
    response.status(200).json([{
        mensagem: "isso Aiiii backeeender"
    }]) 
})

//iniciando o servidor
app.listen(8080, ()=>{
    console.log("Servidor rodando lindo bonito e legal")
})