//simulação do banco de dados

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
  
//começa o servidor

const express = require("express")
const app = express()

//parser do body em json
app.use(express.json())

//rotas raizes
app.get("/filmes", async (request, response)=>{
    let dbFilmes = await bancoDeDados()

    
//desafio de tratar o erro
    if (!dbFilmes){
        return response.status(404).send({
            "message":"Bad Request"
        })
    }
    response.status(200).send(dbFilmes.filmes)
})
//filme por id
app.get("/filmes/pesquisar/:id", async (request, response)=>{

    try {
        let idRequest = request.params.id
        let dbFilmes = await bancoDeDados()
    
        let filmeEncontrado = dbFilmes.filmes.find( filme => filme.id == idRequest)
        //tratar erro
        if(filmeEncontrado == undefined) throw new Error("id não encontrado")

        response.status(200).send(filmeEncontrado)
        
    } catch (error) {
        response.status(404).json({message: error.message})
    }
})

//filme por titulo
app.get("/filmes/pesquisar", async (request, response)=>{
    try {
        let dbFilmes = await bancoDeDados()
        let tituloRequest = request.query.titulo.toLowerCase()

        let encontrarPorTitulo = dbFilmes.filmes.find(filme => filme.Title.toLowerCase().includes(tituloRequest))
        //tratar erro
        if(encontrarPorTitulo.length == 0) throw new Error("filme não encontrado")      

        response.status(200).send(encontrarPorTitulo)
    
    } catch (error) {
        response.status(404).json({message: error.message})
    }
})

//filme por chave-valor 
app.get("/filmes/buscar", async (request, response)=>{
    try {
        let dbFilmes = await bancoDeDados()
        let filmesJson = dbFilmes.filmes
        let parametros = request.query

       
        const chaves = Object.keys(parametros);
       
        const filtrado = filmesJson.filter((filme) => {
              return chaves.some(chave => RegExp(parametros[chave], 'i').test(filme[chave].toString()));
            });    
       
          if(filtrado.length == 0) throw new Error("filme não encontrado")        
        response.status(200).send(filtrado)
        
    } catch (error) {
        response.status(404).json({message: error.message})
    }
})



app.listen(1313, ()=>{
    console.log("Servidor rodando certinho...")
})