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
app.use(express.json())


app.get("/filmes", async (request, response) => {
    let dbFilmes = await bancoDeDados()

    response.status(200).send(dbFilmes.filmes)
})


app.get("/filmes/procurar/:id", async (request, response) => {

    try {
        let idRequest = request.params.id
        let dbFilmes = await bancoDeDados()
        let filmeEncontrado = dbFilmes.filmes.find(filme => filme.id ==  idRequest)

        if(filmeEncontrado == undefined) throw new Error("id não encontrado")
        
        response.status(200).send(filmeEncontrado)
    } catch (error) {
        response.status(404).json({message: error.message})
    }

})


app.get("/filmes/pesquisar", async(request, response)=> {
    try {
        let tituloRequest = request.query.titulo.toLowerCase()
        let dbFilmes = await bancoDeDados()
        let encontrarPorTitulo = dbFilmes.filmes.filter(filme => filme.title.toLowerCase().includes(tituloRequest))

        if(encontrarPorTitulo.length == 0) throw new Error("titulo não encontrado")

        response.status(200).send(encontrarPorTitulo)
        
    } catch (error) {
        response.status(404).json({messagem:error.message})
    //     response.status(404).send({messagem:error.message})
    // }
    }
})



app.post("/filmes/cadastrar", async(request, response) => {
    let bodyRequest = request.body
    let dbFilmes = await bancoDeDados()
    let filmes = dbFilmes.filmes

    let novoFilme = {
        id: (filmes.length)+1,
        title: bodyRequest.title,
        description: bodyRequest.description
    }

    filmes.push(novoFilme)

    response.status(201).send({
        mensagem: "filme cadastrado com sucesso",
        novoFilme
    })
})

app.listen(1313, ()=> {
    console.log("Tomem cuidado com nas votações")
})