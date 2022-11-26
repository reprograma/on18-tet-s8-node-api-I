
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

app.use(express.json())

app.get("/filmes/pesquisar/:id", async (request, response) =>{
    try {
        let dbFilmes = await bancoDeDados()
        let idRequest = request.params.id
        
        let filmeEncontrado = dbFilmes.filmes.find(filme => filme.id == idRequest)
        
        if(filmeEncontrado == undefined) throw new Error("id não encontrado")
        response.status(200).send(filmeEncontrado)      
        
        
    } catch (error) {
        response.status(404).json({message: error.message})
        
    }

})


app.listen(1313, ()=>{
    console.log("Servidor rodando")
})