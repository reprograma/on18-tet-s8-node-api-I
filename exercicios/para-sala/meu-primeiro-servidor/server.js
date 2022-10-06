//invocando o express no nosso arquivo
const express = require("express")

//executar o express
const app = express()

//primeira rota GET
/* padrão: [express][método]("/rota", (requisição, resposta) => {
 response.status(xxx).json()
})*/
app.get("/rota1", (request, response) => {
    response.status(200).json(["JS é uma linguagem de programação muito importante"])
})

app.get("/rota2", (request, response) => {
    response.status(200).json([{
        mensagem: "Olá, bem vindo"
    }])
})

//iniciando o servidor (O LISTEN SEMPRE DEVE FICAR NO FINAL)
/* padrão: [express][listen](porta, () = {
    console.log("colocar alguma coisa para verificar se tá funcionando")
})*/
app.listen(8081, () => {
    console.log("Servidor rodando certo")
})
