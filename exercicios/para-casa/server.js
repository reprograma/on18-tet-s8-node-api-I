const express=require('express')
const app=express()
const port=process.env.PORT || 8080

//parser do body em json
app.use(express.json())

function bancoDeDados() {
    return new Promise((resolve)=>{
        setTimeout(() => {
            return resolve({
                series: require("./data/series.json"),
                filmes: require("./data/filmes.json")
            })
                
        }, 500);
    })
}
  
  
app.get('/menu',(req,res)=>{
    res.status(200).json({
        mensage:'Bem vindo ao Canal de séries e filmes'})
})

app.get('/filmes', async(req,res)=>{
    let bancoFilmes=await bancoDeDados()
    res.status(200).send(bancoFilmes.filmes)
  
})
app.get('/series', async(req,res)=>{
    let bancoCategorias=await bancoDeDados()
    res.status(200).send(bancoCategorias.series)
})

app.get('/todasAsOpcoes', async(req,res)=>{
    let todaAsOpcoes=await bancoDeDados()
    var juncao=todaAsOpcoes.filmes.concat(todaAsOpcoes.series)
    res.status(200).send(juncao)
})

app.get('/filmes/pesquisar/:id', async(req,res)=>{

    try{
        let idRequest=req.params.id
        let bancoFilmes=await bancoDeDados()

        let filmesEncontrados=bancoFilmes.filmes.filter(filmes=>filmes.id==idRequest)
        console.log(filmesEncontrados)
    if(filmesEncontrados==undefined){
        throw new Error('id não encontrado')
    }
        res.status(200).send(filmesEncontrados)
    }
    catch(error){
        res.status(404).json({message:error.message})
    }

})

app.get('/filmes/pesquisar',async(req,res)=>{
  try{
    let dbFilme=await bancoDeDados()
    let tFilmeRequest=req.query.titulo.toLowerCase()
    
    let filtrandoFilme=dbFilme.filmes.find(filme=> filme.Title.toLowerCase().includes(tFilmeRequest))

    if(filtrandoFilme==undefined || filtrandoFilme.length==0) throw new Error('Filme não encontrado')
    
    res.status(200).send(filtrandoFilme)
    }
  
  catch(error){
      res.status(404).send({message:error.message})
  }
})




app.post('/filmes/Adicionar', async(req,res)=>{
    let filmeNovo=req.body
    let idFilme=await bancoDeDados()
    let filtrandoFilme=idFilme.filmes
    console.log(filtrandoFilme)

    // console.log(filtrandoFilme)
    let adicionarFilme={
        id:(filtrandoFilme.length)+1,
        title:filmeNovo.title,
        description:filmeNovo.description
    }

   console.log(adicionarFilme)

    filtrandoFilme.push(adicionarFilme)
    res.status(201).send({message:'Filme adicionado com Sucesso', adicionarFilme})

})


// app.get('filmes/acharChave', async(req,res)=>{
//     let filmeChaveBody=req.query.body()
//     let bancoDados=await bancoDeDados()

//     let filtrandoChave=bancoDados.filmes.filter(filmes.)
// })

app.get('/buscandoPorChave/chave', async(req,res)=>{
    let bancoDados=await bancoDeDados()
    let filmesBanco=bancoDados.filmes
    let valorReq=req.body

    let chaveObject=Object.keys(valorReq)
    
    const filtrando=filmesBanco.filter((filme)=>{
        return chaveObject.filter(key => RegExp( valorReq[key], 'i').test(filme[key]) )
    })

    console.log(filtrando)
    console.log(chaveObject)
})



app.listen(port,()=>{
    console.log(`O servidor está rodando na ${port} no endereço http://localhost:8080/menu`)

    
})