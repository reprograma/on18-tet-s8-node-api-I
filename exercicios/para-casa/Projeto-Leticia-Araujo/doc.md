# documentação

# DOCUMENTAÇÃO DOS FILMES 

- [GET] "/filmes" -> * retonar todos os filmes  - OK!

 - [GET] "/filmes/pesquisar/:id" - OK!
   * retornar um filme por id

 - [GET] "/filmes/pesquisar/:titulo" - OK!
    * retornar filme por titulo
    * retornar erro 404 com a mesnagem:
     "filme não encontrado!" caso cliente digitar nome errado

 - [POST] "/filmes/cadastrar" - OK!
    * cadastrar um novo filme

 - [GET] "/filmes/pesquisar/:" 
   * retornar com chave e/ou valor selecionado -> ERRO!

# DOCUMENTAÇÃO DE SERIES

- [GET] "/series" - OK!
* retonar todos as series  

 - [GET] "/series/pesquisar/:id" - OK!
   * retornar uma serie por id

 - [GET] "/series/pesquisar/:titulo" - OK!
    * retornar series por titulo
    * retornar erro 404 com a mesnagem:
     "serie não encontrada!" caso cliente digitar nome errado

 - [POST] "/serie/cadastrar" - OK!
    * cadastrar uma nova serie

 - [GET] "/series/pesquisar/:"
   * retornar com chave e/ou valor selecionado -> ERRO!