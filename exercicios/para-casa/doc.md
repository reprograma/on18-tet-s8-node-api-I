# documentação

crie as rotas de retorno de todos os filmes e de todas as series: 
por id, 
por titulo e 
por qualquer chave/valor. #DESAFIO#
Crie a rota de criação de filme e serie.

- [GET] "/filmes" 
    * retornar todos os filmes

 - [GET] "/filmes/pesquisar/:id"
    * retornar um filme por id
    
 - [GET] "/filmes/pesquisar?:titulo"
    * retorna filme por titulo
    * retornar erro 404 com a mensagem: "filme não encontrado" caso cliente digitar nome errado

 - [POST] "/filmes/cadastrar"
    * cadastra um novo filme
___________________________________________________________________________________

- [GET] "/series" 
    * retornar todas as series

 - [GET] "/series/pesquisar/:id"
    * retornar uma serie por id
    
 - [GET] "/series/pesquisar?:titulo"
    * retorna serie por titulo
    * retornar erro 404 com a mensagem: "serie não encontrado" caso cliente digitar nome errado

 - [POST] "/series/cadastrar"
    * cadastra uma nova serie