//simulação do banco de dados

function bancoDeDados(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            return resolve ({
                filmes: require("./data/ghibli.json")
            })
        }, 1500);
    })
}

//começa o nosso servidor

const express = require("express")
const app = express()

//parser do body em json
app.use(express.json())


app.get("/filmes", async (request, response)=>{
    let dbFilmes = await bancoDeDados()

    response.status(200).send(dbFilmes.filmes)
})

app.get("/filmes/pesquisar/:id", async (request, response)=>{

    try {
        let idRequest = request.params.id
        let dbFilmes = await bancoDeDados()
    
        let filmeEncontrado = dbFilmes.filmes.find( filme => filme.id == idRequest)

        if(filmeEncontrado == undefined) throw new Error("id não encontrado")

        response.status(200).send(filmeEncontrado)
        
    } catch (error) {
        response.status(404).json({message: error.message})
    }
})

app.get("/filmes/pesquisar", async (request, response)=>{
    try {
        let dbFilmes = await bancoDeDados()
        let tituloRequest = request.query.titulo.toLowerCase()

        let encontrarPorTitulo = dbFilmes.filmes.filter(filme => filme.title.toLowerCase().includes(tituloRequest))

        console.log(encontrarPorTitulo)

        if(encontrarPorTitulo.length == 0) throw new Error("filme não encontrado")
        

        response.status(200).send(encontrarPorTitulo)
    } catch (error) {
        response.status(404).json({message: error.message})
    }
})

app.post("/filmes/cadastrar", async (request, response)=>{
    let bodyRequest = request.body
    let dbFilmes = await bancoDeDados()
    let filmes = dbFilmes.filmes

    console.log(filmes.length)

    let novoFilme = {
        id:(filmes.length)+1,
        title: bodyRequest.title,
        description: bodyRequest.description
    }

    filmes.push(novoFilme)

    response.status(201).send({
        mensagem: "filme cadastrado com sucesso",
        novoFilme
    })

})


app.listen(1313, ()=>{
    console.log("Tomem cuidado nas votações")
})