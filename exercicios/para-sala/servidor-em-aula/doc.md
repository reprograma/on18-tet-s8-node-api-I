## Documentação

- [GET] "/filmes"
    * retornar todos os filmes
- [GET] "/filmes/:id"
    * retornar um filme por id
- [GET] "/filmes/pesquisar?:titulo"
    * retornar filme por titulo (os ':' indicam que essa informação será inserida pelo usuário)
    * retornar erro 404 com a mensagem: "filme não encontrado" caso clinete digitar nome errado
- [POST] "/filmes/cadastrar"
    * cadastrar um novo filme