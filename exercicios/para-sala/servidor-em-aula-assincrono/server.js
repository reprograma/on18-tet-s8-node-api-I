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

app.get("/filmes", async (request, response)=>{
    let dbFilmes = await bancoDeDados()

    response.status(200).send(dbFilmes.filmes)
})

app.listen(1313, ()=>{
    console.log("Tomem cuidado nas votações")
})