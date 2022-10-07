const fs = require("fs");
const bodyParser = require("body-parser");

const app = require("express")();

app.use(bodyParser.json());

const port = "3636";

const filmesJson = "./data/filmes.json";
const seriesJson = "./data/series.json";

function bancoDeDados() {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve({
        series: require(seriesJson),
        filmes: require(filmesJson),
      });
    }, 1500);
  });
}

app
  .route("/filmes")
  .get(async (request, response) => {
    try {
      let dbFilmes = (await bancoDeDados()).filmes;
      if (request.query.id) {
        let filme = dbFilmes.find((filme) => filme.id == request.query.id);
        if (filme === undefined)
          throw { name: "IDError", message: "Id não encontrado." };
        return response.status(200).send(filme);
      } else if (Object.keys(request.query).length > 0) {
        let filmes = [];
        for ([key, value] of Object.entries(request.query)) {
          value = value.toLowerCase();
          filmes = dbFilmes.filter((filme) =>
            filme[key].toLowerCase().includes(value)
          );
          if (filmes.length > 0) {
            return response.status(200).send(filmes);
          }
        }
        if (filmes.length == 0)
          throw { name: "ParamError", message: "Parâmetro não encontrado." };
      }
      return response.status(200).send(dbFilmes);
    } catch (err) {
      if (err.name) {
        response.status(404).json({ erro: err.name, mensagem: err.message });
      } else {
        response.status(500).json({
          erro: "O servidor não conseguiu realizar a requisição no momento.",
        });
      }
    }
  })
  .post(async (request, response) => {
    let body = request.body;
    console.log(body);
    let dbFilmes = (await bancoDeDados()).filmes;
    let novoFilme = {
      id: dbFilmes.length + 1,
      Titulo: body.title,
      description: body.description,
    };
    dbFilmes.push(novoFilme);
    fs.writeFileSync(filmesJson, JSON.stringify(dbFilmes));
    response.status(201).send(novoFilme);
  });

app
  .route("/series")
  .get(async (request, response) => {
    try {
      let dbSeries = (await bancoDeDados()).series;
      if (request.query.id) {
        let filme = dbSeries.find((filme) => filme.id == request.query.id);
        if (filme === undefined)
          throw { name: "IDError", message: "Id não encontrado." };
        return response.status(200).send(filme);
      } else if (Object.keys(request.query).length > 0) {
        let filmes = [];
        for ([key, value] of Object.entries(request.query)) {
          value = value.toLowerCase();
          filmes = dbSeries.filter((filme) => {
            if (typeof filme[key] === "string") {
              return filme[key].toLowerCase().includes(value);
            } else {
              return filme[key].filter((texto) =>
                texto.toLowerCase().includes(value)
              );
            }
          });
          if (filmes.length > 0) {
            return response.status(200).send(filmes);
          }
        }
        if (filmes.length == 0)
          throw { name: "ParamError", message: "Parâmetro não encontrado." };
      }
      return response.status(200).send(dbSeries);
    } catch (err) {
      if (err.name) {
        response.status(404).json({ erro: err.name, mensagem: err.message });
      } else {
        response.status(500).json({
          erro: "O servidor não conseguiu realizar a requisição no momento.",
        });
      }
    }
  })
  .post(async (request, response) => {
    let body = request.body;
    console.log(body);
    let dbSeries = (await bancoDeDados()).series;
    let novoFilme = {
      id: dbSeries.length + 1,
      title: body.title,
      description: body.description,
    };
    dbSeries.push(novoFilme);
    fs.writeFileSync(seriesJson, JSON.stringify(dbSeries));
    response.status(201).send(novoFilme);
  });

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
