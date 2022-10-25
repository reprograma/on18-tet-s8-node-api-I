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

const { request } = require("express");
// prof, mesmo vendo a aula sincrona e revendo as aulas para fazer o exercício, eu sempre tento fazer sozinha para ver o que eu aprendi.
// Achei esse exercício muito legal. 
// o último de retornar por qualquer chave e valor, eu não consegui fazer. Então fiz com a ajuda da resolução


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



// essa busca genérica foi feita com a ajuda da resolução. Deixei para fazer o try/catch junto também. 
app.get("/filmes/buscar", async (request, response) => {
    try {

        let dbFilmes = await bancoDeDados()
        let filmesJson = dbFilmes.filmes
        let parametros = request.query


        const chaves = Object.keys(parametros);

        const filtrado = filmesJson.filter((filme) => {
            return chaves.some(key => RegExp(parametros[key], 'i').test(filme[key].toString()));
        });

        if(filtrado.length == 0) throw new Error("Filme não encontrado")

        response.status(200).send(filtrado)
        
    } catch (error) {
        response.status(404).json({message: error.message})
        
    }
    
})


//na primeira resolução, eu tinha intepretado o "criar a rota de criação de filmes e série" como o que já estavámos fazendo e não como uma rota para fazer o cadastro de novos filmes e series... Fiz para filmes e series e reenviei. 

app.post("/filmes/cadastrar", async (request, response) =>{
    let bodyRequest = request.body
    let dbFilmes = await bancoDeDados()
    let filmes = dbFilmes.filmes

    const novoFilme = {
        id: (filmes.length)+1,
        title: bodyRequest.title,
        description: bodyRequest.description
    }

    filmes.push(novoFilme) 

    response.status(200).send({
        message: "Filme cadastrado com sucesso",
        novoFilme
    })

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



//Feito com a ajuda da resolução.
app.get("/series/buscar", async (request, response)=> {
    try {
        let dbSeries = bancoDeDados()
        let seriesJson = dbSeries.series
        let parametros = request.query

        const chaves = Object.key(parametros);

        const filtrado = seriesJson.filter((serie) => {
            return chaves.some(key => RegExp(parametros[key], 'i').test(serie[key].toString()));
        })

        if(filtrado.length == 0) throw new Error("Serie não encontrada")

        response.status(200).send(filtrado)
        
    } catch (error) {
        response.status(404).json({message: error.message})
        
    }


})


app.post("/series/cadastrar", async (request, response)=> {
    let bodyRequest = request.body
    let dbSeries = await bancoDeDados()
    let series = dbSeries.series

    const novaSerie = {
        id: (series.length)+1,
        title: bodyRequest.title,
        description: bodyRequest.description
    }

    series.push(novaSerie)

    response.status(200).send({
        message: "Serie cadastrada com sucesso",
        novaSerie
    })

})






app.listen(4040, ()=> {
    console.log("Está tudo certo")
})

