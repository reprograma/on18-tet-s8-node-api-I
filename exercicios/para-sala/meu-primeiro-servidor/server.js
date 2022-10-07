const express = require ("express")

//executar 
const app = express()

app.get("/", (request, response)=>{
    response.status(200).json(["JS é muito legal uhuuul somos backenderssss"])
})

//iniciando o servidor
app.listen(8080, ()=>{
    console.log("Servidor rodando lindo bonito e legal")
})