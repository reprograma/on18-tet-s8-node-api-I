## Documentação

- [GET] "/filmes"
    * retornar todos os filmes

- [GET] "/filmes/:id"
    * retornar um filme por id

- [GET] "/filmes/:titulo"
    * retornar filme por título
    * retornar erro 404 com a mensagem: "filme não encontrado" caso cliente digitar nome errado

- [POST] "/filme/cadastrar"
    * cadastra um novo filme