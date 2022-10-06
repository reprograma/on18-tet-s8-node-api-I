# documentação

// SERIES
- [GET] "/series"
    *Retorna todas as series
- [GET] "/series/pesquisar/:id"
    *Retorna uma serie encontrada pelo ID
    *Retorna erro 500 com a mensagem "ID não encontrado" caso cliente informe um ID inválido

- [GET] "/series/pesquisar"
    *Retorna uma serie encontrada pelo título
    *Retorna erro 500 com a mensagem "Serie não encontrada" caso cliente digitar uma serie que não tenha no db

- [POST] "/series/cadastrar"
    *Cadastra uma nova série
    *Retorna erro 500 com mensagem "Não foi possível cadastrar uma nova série, preencha todos os campos solicitados!" caso cliente não digite todos os dados obrigatorios

// FILMES
- [GET] "/filmes"
    *Retorna todos os filmes

- [GET] "/filmes/pesquisar/:id"
    *Retorna um filme encontrado pelo ID
    *Retorna erro 500 com a mensagem "ID não encontrado" caso cliente informe um ID inválido

- [GET] "/filmes/pesquisar"
    *Retorna um filme encontrado pelo título
    *Retorna erro 500 com a mensagem "Filme não encontrado" caso cliente digitar um filme que não tenha no db

- [GET] "/filmes/cv"

- [POST] "/filmes/cadastrar"
    *Cadastra um novo filme
    *Retorna erro 500 com mensagem "Não foi possível cadastrar um novo filme, preencha todos os campos solicitados!" caso cliente não digite todos os dados obrigatorios