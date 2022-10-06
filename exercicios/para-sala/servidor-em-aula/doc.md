## Documentação

- [GET] "/filmes"
    * Retornar todos os filmes
- [GET] "filmes/:id"
    * Retorna um filme por id
- [GET] "filmes/:titulo"
    * Retorna filme por título
    * Retorna erro 404 com a mensagem: "filme não encontrado" caso o cliente digitar nome errado
- [POST] "/filmes/cadastrar"
    * Cadastra um novo filme