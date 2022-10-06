## Documentação

 - [GET] "/filmes"
 * retonar todos os filmes

 - [GET] "/filmes/consulta/:id"
    * retornar um filme por id

 - [GET] "/filmes/pesquisar/:titulo
    * retornar filme por titulo
    * retornar erro 404 com a mesnagem:
     "filme não encontrado" caso cliente digitar nome errado

 - [POST] "/filme/novo/cadastro"
    * cadastrar um novo filme