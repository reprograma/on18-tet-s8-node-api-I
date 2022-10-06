function bancoDeDados() {
    return new Promise((resolve)=>{
        setTimeout(() => {
            return resolve({
                series: require("./data/series.json"),
                filmes: require("./data/filmes.json")
            })
                
        }, 1500);
    })
}
  

  const express = require("express")
  const app = express()

  const filmesJson = require("./data/filmes.json")
 const seriesJson = require("./data/series.json")

  app.use(express.json())


  app.get("/filmes",async(request,response)=>{
    let listaFilmes = await bancoDeDados()
    response.status(200).send(listaFilmes.filmes)
  })

  app.get("/filmes/pesquisar/:id",async (request, response)=>{
    try{
    let idRequest = request.params.id
    let listaFilmes = await bancoDeDados()
    let filmeEncontrado = listaFilmes.filmes.find(filme => filme.id == idRequest)
console.log(filmeEncontrado)
if(filmeEncontrado == undefined) new Error("id indefinido!")
    response.status(200).send(filmeEncontrado)
    }catch(error){
    response.status(500).json({message:error.message})
    }
}) 
app.get("/filmes/pesquisar", async (request, response)=>{

    try {

        let listaFilmes = await bancoDeDados()
        let tituloRequest = request.query.titulo.toLowerCase()

        let filmeEncontradoPorTitulo = listaFilmes.filmes.filter(filme => filme.Title.toLowerCase().includes(tituloRequest))

        console.log(filmeEncontradoPorTitulo)

        if (filmeEncontradoPorTitulo.length == 0) throw new Error("filme não encontrado")

        response.status(200).send(filmeEncontradoPorTitulo)

    } catch (error) {
        response.status(404).json({message: error.message})
    }


});


//cadastrando um novo filme

app.post("/filmes/cadastrar",async (request, response)=>{
    let bodyRequest = request.body
    let listaFilmes = await bancoDeDados()
    console.log(filmes.length) 

    let novoFilme = {
        id:(filmes.length)+1,
        title:bodyRequest.title,
        description: bodyRequest.description
    }

    filmesJson.push(novoFilme)

    response.status(201).send({
        mensagem: "Filme cadastrado com sucesso!",
        data: novoFilme
    })

})

//rotas das series

//retornando todas as series

app.get("/series", async (request, response)=>{
    let listaSerie = await bancoDeDados()
    response.status(200).send(listaSerie)
})

//retornando a serie com id selecionado

app.get("/series/pesquisar/:id", (request, response)=>{
    let idRequest = request.params.id
    let serieEncontrada = seriesJson.find(serie => serie.id == idRequest)

    response.status(200).send(serieEncontrada)
})

//retornando a serie com titulo selecionado

app.get("/series/pesquisar", (request, response)=>{
    let tituloRequest = request.query.titulo.toLowerCase()

    let serieEncontrada = seriesJson.filter(
        serie => serie.title.toLowerCase().includes(tituloRequest))

    response.status(200).send(serieEncontrada)

})

//retornando a serie com chave/valor selecionado

app.get("/serie/pesquisar/:entries", (request, response)=>{
    let entriesRequest = request.query.entries.toLowerCase()

    let serieEncontrada = seriesJson.filter(
        serie => serie.entries.toLowerCase().includes(entriesRequest))

    response.status(200).send(serieEncontrada)

})

//cadastrando uma nova serie

app.post("/serie/cadastrar", (request, response)=>{
    let bodyRequest = request.body

    let novaSerie = {
        id: bodyRequest.id,
        title:bodyRequest.title,
        description: bodyRequest.description
    }

    seriesJson.push(novaSerie)

    response.status(201).send({
        mensagem: "Serie cadastrada com sucesso!",
        data: novaSerie
    })

})


//final



  app.listen(9091,()=>{
    console.log("Servidor OK!")
  })