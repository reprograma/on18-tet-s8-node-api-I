const app = require("express")();

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

app.get("/filmes", async (request, response) => {
  let dbFilmes = await bancoDeDados();
  dbFilmes = dbFilmes.filmes;
  response.status(200).send(dbFilmes);
});

app.get("/filmes/pesquisar/:id", async (request, response) => {
  try {
    let dbFilmes = await bancoDeDados();
    dbFilmes = dbFilmes.filmes;
    let filme = dbFilmes.find((filme) => filme.id == request.params.id);
    if (filme === undefined) throw new Error("Id não encontrado");
    response.status(200).send(filme);
  } catch (err) {
    response.status(404).json({ message: err.message });
  }
});

app.get("/filmes/pesquisar", async (request, response) => {
  try {
    let dbFilmes = await bancoDeDados();
    let tituloRequest = request.query.titulo.toLowerCase();
    dbFilmes = dbFilmes.filmes;
    let filmes = dbFilmes.filter((filme) =>
      filme.Title.toLowerCase().includes(tituloRequest)
    );
    if (filmes === false) throw new Error("Título não encontrado.");
    response.status(200).send(filmes);
  } catch (err) {
    response.status(404).json({ message: err.message });
  }
});

app.post("filmes/cadastrar", async (request, response) => {
  let body = request.body;
  let dbFilmes = await bancoDeDados();
  let filmes = dbFilmes.filmes;
  let novoFilme = {
    id: filmes.length + 1,
    Titulo: body.title,
    description: body.description,
  };
  filmes.push(novoFilme);
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
