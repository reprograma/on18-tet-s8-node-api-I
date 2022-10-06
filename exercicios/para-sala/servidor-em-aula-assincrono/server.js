// Simulação do banco de dados

function bancoDeDados() {
    return new Promise((resolve) => {
        setTimeout(() => {
            return resolve ({
                filmes: require("./data/ghibli.json")
            })
        }, 1500);
    })
}

// Início do servidor

const express = require("express")
const app = express()

app.use(express.json())

app.get("/filmes", async (request, response) => {
    let dbFilmes = await bancoDeDados()

    response.status(200).send(dbFilmes.filmes)
})

// por Path params
app.get("/filmes/pesquisar/:id", async (request, response) => {
    try {
        let idRequest = request.params.id
        let dbFilmes = await bancoDeDados()
    
        let pesquisarId = dbFilmes.filmes.find((filme) => filme.id == idRequest)
        console.log(pesquisarId)

        if(pesquisarId == undefined) throw new Error("id não encontrado")

        response.status(200).send(pesquisarId)

    } catch (error) {
        response.status(404).json({message: error.message})
    }
})

// por Query params
app.get("/filmes/pesquisar", async (request, response) => {
    try {
        let tituloRequest = request.query.titulo.toLowerCase()
        let dbFilmes = await bancoDeDados()
        
        let pesquisarTitulo = dbFilmes.filmes.filter((filme) => filme.Title.toLowerCase().includes(tituloRequest))

        if(pesquisarTitulo.length == 0) throw new Error("filme não encontrado")

        response.status(200).send(pesquisarTitulo)
    } catch (error) {
        response.status(404).json({message: error.message})
    }
})

app.post("/filmes/cadastrar", async (request, response) => {
    let bodyRequest = request.body
    let dbFilmes = await bancoDeDados()

    let filmes = dbFilmes.filmes

    console.log(filmes.length)

    let novoFilme = {
        id: (filmes.length)+1,
        title: bodyRequest.title,
        description: bodyRequest.description
    }

    filmes.push(novoFilme)

    response.status(201).send({
        mensagem: "Filme cadastrado com sucesso!",
        novoFilme
    })
})

app.listen(1313, () => {
    console.log("Servidor assíncrono funcionando")
})