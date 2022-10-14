const express=require('express')
const app=express()
const filmesJson=require('./data/ghibli.json')

app.get('/filmes',(request, response)=>{
    response.status(200).json({
        mensagem:'está funcionando',
        data:filmesJson
    }
        
    )
})

app.get('/filmes/pesquisar/:id',(request,response)=>{
    let idResquest=request.params.id

    let filmeEncontrado=filmesJson.find(filmes=>filmes.id==idResquest)
    response.status(200).json(filmeEncontrado)


})

app.get('/filmes/pesquisar',(request,response)=>{
console.log(request.query)
let tituloRequest=request.query.titulo.toLowerCase()

let filmesEncontrados=filmesJson.filter(filmes=>filmes.title.toLowerCase().includes(tituloRequest))
console.log(filmesEncontrados)

response.status(200).send(filmesEncontrados)
})


app.post('/filmes/cadastrar',(request,response)=>{

let bodyRequest=request.body

let listaNova={
    id:bodyRequest.id,
    title:bodyRequest.title,
    description:bodyRequest.description
}


filmesJson.push(listaNova)

response.status(200).send({
    mensagem:'enviado com sucesso',
    data:listaNova
})


})

app.listen(8080,()=>{
    console.log('estou pegando')
})