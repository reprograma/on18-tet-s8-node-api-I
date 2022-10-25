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

// prof, mesmo vendo a aula sincrona e revendo as aulas para fazer o exercício, eu sempre tento fazer sozinha para ver o que eu aprendi.
// Achei esse exercício muito legal. 
// o último de retornar por qualquer chave e valor, eu não consegui fazer. 


const express = require("express")
const app = express()
app.use(express.json())

app.get("/filmes", async (request, response)=> {
    const dadosFilmes = await bancoDeDados()
    response.status(200).send(dadosFilmes.filmes)

})


app.get("/filmes/procurar/:id", async (request, response) => {

    const filmeId = request.params.id
    const listaComFilmes = await bancoDeDados()
    const acesseFilmes = listaComFilmes.filmes
    const filmeEncontrado = acesseFilmes.find(filme => filme.id == filmeId)

    response.status(200).send(filmeEncontrado)
})


app.get("/filmes/procurar", async (request, response) => {
    const filmeTitulo = request.query.titulo.toLowerCase()
    const listaComFilmes = await bancoDeDados()
    const acesseFilmes = listaComFilmes.filmes
    const filmeEncontrado = acesseFilmes.filter(filme => filme.Title.toLowerCase().includes(filmeTitulo))

    response.status(200).send(filmeEncontrado)

})



app.get("/series", async (request, response)=> {
    const dadosSeries = await bancoDeDados()
    response.status(200).send(dadosSeries.series)
})



app.get("/series/procurar/:id", async (request, response) => {
    const seriesId = request.params.id
    const dadosSeries = await bancoDeDados()
    const acesseId = dadosSeries.series
    const serieEncontrada = acesseId.find(serie => serie.id == seriesId)

    response.status(200).send(serieEncontrada)
})


app.get("/series/procurar", async (request, response) => {
    const serieTitulo = request.query.titulo.toLowerCase()
    const dadosSeries = await bancoDeDados()
    const acesseSeries = dadosSeries.series
    const serieEncontrada = acesseSeries.filter(serie => serie.title.toLowerCase().includes(serieTitulo))

    response.status(200).send(serieEncontrada)

})




app.listen(4040, ()=> {
    console.log("Está tudo certo")
})

