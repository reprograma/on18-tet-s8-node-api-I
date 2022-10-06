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
  
const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json())

const series = require("./data/series.json");
const filmes=  require("./data/filmes.json");

console.log("filmes: " + filmes);
app.get('/filmes', async (req, res) => {
    const bd = await bancoDeDados();
    res.json(bd.filmes);
});

app.get('/filmes/buscar/:id', async (req, res) => {
    const bd = await bancoDeDados();
    const id = +req.params["id"];
    const filme = bd.filmes.find( f => f.id === id);

    if( !filme ) {
        res.status(404);
        //res.sendStatus(404);
        res.send("Filme não encontrado");
    }
    else {
        res.json(filme);
    }
});

app.get('/filmes/buscar/:nome', async (req, res) => {
    const bd = await bancoDeDados();
    const nome = req.params["nome"].toLowerCase();;
    const filme = bd.filmes.find( f => f.title.toLowerCase() === nome);

    if( !filme ) {
        res.status(404);
        //res.sendStatus(404);
        res.send("Filme não encontrado");
    }
    res.send(filme);
});

app.get('/filmes/buscar/por_chave_valor/:chave/valor/:valor', async (req, res) => {
    const bd = await bancoDeDados();
    const chave = req.params["chave"];
    const valor = req.params["valor"];
    const filme = bd.filmes.find( f => f[chave] == valor);

    if( !filme ) {
        res.status(404);
        //res.sendStatus(404);
        res.send("Filme não encontrado");
    }
    res.send(filme);
});

app.get('/filmes/buscar/:id', (req, res) => {
    const id = +req.params["id"];
    const filme = filmes.find( f => f.id === id);

    if( !filme ) {
        res.status(404);
        //res.sendStatus(404);
        res.send("Filme não encontrado");
    }
    else {
        res.json(filme);
    }
});

app.get('/filmes/buscar/:nome', async (req, res) => {
    const nome = req.params["nome"].toLowerCase();;
    const filme = filmes.find( f => f.Title.toLowerCase() === nome);

    if( !filme ) {
        res.status(404);
        //res.sendStatus(404);
        res.send("Filme não encontrado");
    }
    res.send(filme);
});

app.get('/filmes/buscar/por_chave_valor/:chave/valor/:valor', async (req, res) => {
    const chave = req.params["chave"];
    const valor = req.params["valor"];
    const filme = filmes.find( f => f[chave] == valor);

    if( !filme ) {
        res.status(404);
        //res.sendStatus(404);
        res.send("Filme não encontrado");
    }
    res.send(filme);
});

app.get('/filmes/cadastrar', async (req, res) => {
    //res.send(filmes);
});
  
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor escutando na porta ${port}`)
});