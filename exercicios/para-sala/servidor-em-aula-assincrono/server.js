function bancoDeDados(){
    return new Promise((resolve)=>{
        setTimeout(() => {
            return resolve({
                filmes: require("./data/ghibli.json")
            })
        },1500 );
    })
}

const { request } = require("express");
const express = require("express") //invocando express

const app = express()      //execução do express e guarda em uma variavel

app.use(express.json())     // transforma body em json

// começando uma rota GET é um metodo HTTP que vai ser disponibilizado

app.get("/filmes", async(request, response ) =>{
    let dbFilmes = await bancoDeDados()

    response.status(200).send(dbFilmes.filmes)
}) 

app.get("/filmes/buscar/:id", async(request , response) =>{
    try {
        let dbFilmes = await bancoDeDados()
        let idRequest = request.params.id

        let filmeEncontrado = dbFilmes.filmes.find(filme => filme.id == idRequest)

   ////quando <- isso aqui acontecer lançe um novo erro 
    if(filmeEncontrado == undefined) throw new Error("Id não encontrado.")

    response.status(200).send(filmeEncontrado)
        
    } catch (error) {
        response.status(404).json({message : error.message})
        
    }

})

app.get("/filme/buscar/:nome", async(resquest , response) =>{
    nomeFilmes = await bancoDeDados()

})


app.listen(1313, () =>{
    console.log("Cheguei")
})



