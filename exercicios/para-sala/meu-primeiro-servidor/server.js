const express = require ("express")

// executar o express 
const app = express()

// nossa primeira rota GET 
// [express]
app.get("/", (request,response)=>{
    response.status(200).json(["JS é muito legal!"])
})
app.get ("/oi",(request,response)=>{
    response.status(200).json([{
        mensagem: "oi coisa linda"
    }])
})
// iniciando o servidor
app.listen(8081,()=> {
    console.log("servidor rodando linda bonito e legal")
})