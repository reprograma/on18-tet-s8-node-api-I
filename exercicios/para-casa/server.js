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
const app = express();
app.use(express.json())

app.get('/filmes', async (req, res) => {
    const bd = await bancoDeDados();
    res.json(bd.filmes);
});

app.get('/filmes/por_id/:id', async (req, res) => {
    const bd = await bancoDeDados();
    const id = +req.params.id;
    const filme = bd.filmes.find( f => f.id === id);

    if( !filme ) {
        res.status(404);
        res.send("Filme não encontrado");
    }
    else {
        res.json(filme);
    }
});

app.get('/filmes/por_nome/', async (req, res) => {
    const bd = await bancoDeDados();
    const nome = req.query.nome.toLowerCase();;
    const filme = bd.filmes.find( f => f.Title.toLowerCase() === nome);

    if( !filme ) {
        res.status(404);
        res.send("Filme não encontrado");
    } else {
        res.json(filme);
    }
    
});

app.get('/filmes/por_chave_valor', async (req, res) => {
    const bd = await bancoDeDados();
    const chave = req.query.chave.toLowerCase();
    const valor = req.query.valor.toLowerCase();
    const filmes = bd.filmes.filter( f => {
        for (const chaveObjeto of Object.keys(f)) {
            if( chaveObjeto.toLowerCase() == chave) {
                const valorString = ""+ f[chaveObjeto];
                return valorString.toLowerCase() == valor;
            }
        }
        return false;
    });

    if( filmes.length == 0 ) {
        res.status(404);
        res.json("Filme não encontrado");
    } else {
        res.json(filmes);
    }
    
});

app.post("/filmes/cadastrar", async (request, response)=>{
    try {
        let bodyRequest = request.body
        let dbFilmes = await bancoDeDados()
        let filmes = dbFilmes.filmes

        if( !("title" in bodyRequest) ) {
            response.status(400).json({message: "título faltando."});
            return;
        }

        if( !("description" in bodyRequest) ) {
            response.status(400).json({message: "descrição faltando."});
            return;
        }

        let novoFilme = {
            id:(filmes.length)+1,
            title: bodyRequest.title,
            description: bodyRequest.description
        }

        filmes.push(novoFilme)

        response.status(201).send({
            mensagem: "filme cadastrado com sucesso",
            novoFilme
        })
    } catch {
        res.status(500).json({message: "Houve um erro ao cadastrar filme."});
    }

})

app.get('/series', async (req, res) => {
    const bd = await bancoDeDados();
    res.json(bd.series);
});

app.get('/series/por_id/:id', async (req, res) => {
    const bd = await bancoDeDados();
    const id = req.params.id;
    const serie = bd.series.find( s => s.id === id);

    if( !serie ) {
        res.status(404);
        res.send("Série não encontrada");
    }
    else {
        res.json(serie);
    }
});

app.get('/series/por_nome/', async (req, res) => {
    const bd = await bancoDeDados();
    const nome = req.query.nome.toLowerCase();;
    const serie = bd.series.find( f => f.title.toLowerCase() === nome);

    if( !serie ) {
        res.status(404);
        res.send("Série não encontrada");
    } else {
        res.json(serie);
    }
    
});

app.get('/series/por_chave_valor', async (req, res) => {
    const bd = await bancoDeDados();
    const chave = req.query.chave.toLowerCase();
    const valor = req.query.valor.toLowerCase();
    const series = bd.series.filter( s => {
        for (const chaveObjeto of Object.keys(s)) {
            if( chaveObjeto.toLowerCase() == chave) {
                const valorString = ""+ s[chaveObjeto];
                return valorString.toLowerCase() == valor;
            }
        }
        return false;
    });

    if( series.length == 0 ) {
        res.status(404);
        res.json("Séries não encontradas");
    } else {
        res.json(series);
    }
    
});

app.post("/series/cadastrar", async (request, res)=>{
    try {
        let bodyRequest = request.body
        let dbFilmes = await bancoDeDados()
        let series = dbFilmes.series

        console.log(series.length)

        if( !("title" in bodyRequest) ) {
            res.status(400).json({message: "título faltando."});
            return;
        }

        if( !("description" in bodyRequest) ) {
            res.status(400).json({message: "descrição faltando."});
            return;
        }

        let novaSerie = {
            id:(series.length)+1,
            title: bodyRequest.title,
            description: bodyRequest.description
        }

        series.push(novaSerie)

        res.status(201).send({
            mensagem: "serie cadastrada com sucesso",
            novaSerie
        })

    } catch {
        res.status(500).json({message: "Houve um erro ao cadastrar filme."});
    }

})
  
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor escutando na porta ${port}`)
});