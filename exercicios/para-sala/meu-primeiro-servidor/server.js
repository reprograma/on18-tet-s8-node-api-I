//invocando o express no nosso arquivo
const express = require("express")

//executar o express
const app = express()

//nossa primeira rota GET
//[EXPRESS][METODO]("/ROTA",(REQUISIÇÃO, RESPOSTA)={})
app.get("/",(request, response)=>{
    //RESPONDE.STATUS(XXX).JASON()
    response.status(200).json(["amando mexer com JS"])
})
//nesse caso só mudou pois foi feito um objeto
app.get("/oi", (request, response)=>{
    response.status(200).json([{
        mensagem: "feliz feliz :)"
    }])

})

//iniciando servidor
//sempre no final
app.listen(8080, ()=>{
    console.log ("deu certo")
})
