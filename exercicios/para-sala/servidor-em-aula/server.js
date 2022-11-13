const filmesJson = require("./data/ghibli.json")


const express = require("express")
const { send } = require("process")

const app = express()

app.use(express.json())


app.get("/filmes", (request , response)=> {
    response.status(200).json({
        mensagem : "Está funcionando",
        data : filmesJson
    })

})
app.get("/filmes/pesquisar/:id",(request , response)=>{
    console.log(request.params.id)
    let idRequest = request.params.id
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    response.status(200).send(filmeEncontrado)

})

app.get("/filmes/pesquisar", (request , response)=>{
     let tituloRequest = request.query.titulo.toLocaleLowerCase()
     let filmeEncontrado =filmesJson.filter(
        filme =>filme.title.toLocaleLowerCase().includes(tituloRequest))
        console.log(filmeEncontrado)
     response.status(200).send(filmeEncontrado)


})

app.post("/filmes/cadastrar", (request , response) => {
    let bobyRequest = request.boby
    

    let novoFilme = {
        id :bobyRequest.id,
        title : bobyRequest.title,
        description : bobyRequest.description
    }

})

filmesJson.push(novoFilme)

response.status(201).send({
    mensagem : "Filme cadastrado com sucesso",
    data : novoFilme
})




app.listen(3030 , () =>{
    console.log("AlÔ moreno!")

})





