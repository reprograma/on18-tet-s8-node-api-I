const filmesJson = request("./data/ghibli.json")

const express = require("express")  // chamando express no arquivo

const app = express()   //executando express 



app.get("/", (request , response) =>{
    response.status(200).json(["Eu estou brocando com js"])

})

app.get("/oi",(request , response) =>{
    response.status(200).json([{
        mensagem : "Esse é só o começo "
    }])

})

// iniciando servidor 
app.listen(8080 , () =>{
    console.log("Meu primeiro desenvolvimento!")

})




