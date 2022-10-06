function bancoDeDados() {
    return new Promise((resolve) => {
        setTimeout(() => {
            return resolve({
                series: require("./data/series.json"),
                filmes: require("./data/filmes.json"),
            });
        }, 1500);
    });
}

const { response } = require("express");
const express = require("express");
const app = express();

app.use(express.json());

app.get("/filmes/id/:id", async(request, response) => {
    let banco = await bancoDeDados();
    let filmeIdRequest = request.params.id;
    let filmeEncontrado = banco.filmes.find(
        (filme) => filme.id == filmeIdRequest
    );

    response.status(200).send(filmeEncontrado);
    try {
        let banco = await bancoDeDados();
        let idRequest = request.params.id;

        let filmeEncontrado = banco.filmes.find((filme) => filme.id == idRequest);
        response.status(200).send(filmeEncontrado);

        if (filmeEncontrado == undefined)
            throw new Error({ mensagem: "Filme não encontrado" });
    } catch (error) {
        response.status(404).send(error.mensagem);
    }
});

app.get("/filmes/title/:Title", async(request, response) => {
    let banco = await bancoDeDados();
    let filmeTitleRequest = request.params.Title;
    let filmeEncontrado = banco.filmes.find((filme) =>
        filme.Title.toLowerCase().includes(filmeTitleRequest.toLowerCase())
    );

    response.status(200).send(filmeEncontrado);
    try {
        let banco = await bancoDeDados();
        let tituloRequest = request.query.titulo.toLowerCase();

        let encontrarPorTitulo = banco.filmes.filter((filme) =>
            filme.Title.toLowerCase().includes(tituloRequest)
        );

        console.log(encontrarPorTitulo);

        if (encontrarPorTitulo.length == 0) throw new Error("Filme não encontrado");

        response.status(200).send(encontrarPorTitulo);
    } catch (error) {
        response.status(404).json({ message: error.message });
    }
});

app.get("/filmes/query", async(request, response) => {
    let requestItem = request.query.item;
    let banco = await bancoDeDados();

    let filmeEncontrado = banco.filmes.filter((filme) =>
        filme.Title.toLowerCase().includes(requestItem.toLowerCase())
    );

    response.status(200).send(filmeEncontrado);

    try {
        let requestItem = await bancoDeDados();
        let banco = request.query.titulo.toLowerCase();

        let encontrarPorTitulo = banco.filmes.filter((filme) =>
            filme.Title.toLowerCase().includes(tituloRequest)
        );

        if (encontrarPorTitulo.length == 0) throw new Error("filme não encontrado");

        response.status(200).send(encontrarPorTitulo);
    } catch (error) {
        response.status(404).json({ message: error.message });
    }
});

app.get("/series/id/:id", async(request, response) => {
    let seriesID = request.params.id;
    let banco = await bancoDeDados();

    let serieEncontrada = banco.series.find((serie) => serie.id == seriesID);

    response.status(200).send(serieEncontrada);
    try {
        let banco = await bancoDeDados();
        let idRequest = request.params.id;

        let serieEncontrada = banco.filmes.find((filme) => filme.id == idRequest);
        response.status(200).send(serieEncontrado);

        if (serieEncontrada == undefined)
            throw new Error({ mensagem: "Serie não encontrada" });
    } catch (error) {
        response.status(404).send(error.mensagem);
    }
});

app.get("/series/title/:title", async(request, response) => {
    let seriesTitle = request.params.title;
    let banco = await bancoDeDados();

    let serieEncontrada = banco.series.filter((serie) =>
        serie.title.toLowerCase().includes(seriesTitle.toLowerCase())
    );

    response.status(200).send(serieEncontrada);

    try {
        let banco = await bancoDeDados();
        let tituloRequest = request.query.titulo.toLowerCase();

        let encontrarPorTitulo = banco.series.filter((serie) =>
            serie.Title.toLowerCase().includes(tituloRequest)
        );

        console.log(encontrarPorTitulo);

        if (encontrarPorTitulo.length == 0) throw new Error("serie não encontrada");

        response.status(200).send(encontrarPorTitulo);
    } catch (error) {
        response.status(404).json({ message: error.message });
    }
});

app.get("/series/query", async(request, response) => {
    let requestQuery = request.query.item;
    let banco = await bancoDeDados();

    let serieEncontrada = banco.serie((serie) =>
        serie.Title.toLowerCase().includes(requestItem.toLowerCase())
    );

    response.status(200).send(serieEncontrada);
    try {
        let requestQuery = await bancoDeDados();
        let banco = request.query.item.toLowerCase();

        let encontrarPorQuery = banco.series.filter((serie) =>
            serie.Title.toLowerCase().includes(queryRequest)
        );

        if (encontrarPorQuery.length == 0) throw new Error("Série não encontrada");

        response.status(200).send(encontrarPorQuery);
    } catch (error) {
        response.status(404).json({ message: error.message });
    }
});

app.listen(1982, () => {
    console.log("Call me little sunshine!");
});