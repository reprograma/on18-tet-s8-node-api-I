## Documentação
- [GET] "/filmes"
    *retornar todos os filmes
- [GET] "/filmes/:id"
    *retornar um filme por ID
- [GET] "filmes/pesquisar?:titulo"
    *retorna filme por titulo
    *retornar erro 404 com a mensagem "filme não encontrado" caso cliente digitar nome errado
- [POST] "filmes/cadastrar"
    *cadastra um novo filme