const express = require("express");
const fs = require("fs");
const app = express();

const filmes = fs.readFileSync()("data/ghibli.json");

console.log("filmes: " + filmes);
app.get('/filmes', async (req, res) => {
    res.send(filmes);
});

app.get('/filmes/buscar/:id', async (req, res) => {
    const id = +req.params["id"];
    const filme = filmes.find( f => f.id === id);

    if( !filme ) {
        res.status(404);
        //res.sendStatus(404);
        res.send("Filme não encontrado");
    }
    res.send(filme);
});

app.get('/filmes/buscar/:nome', async (req, res) => {
    const nome = req.params["nome"].toLowerCase();;
    const filme = filmes.find( f => f.title.toLowerCase() === nome);

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
  
app.listen(port, () => {
    console.log(`Servidor escutando na porta ${port}`)
});