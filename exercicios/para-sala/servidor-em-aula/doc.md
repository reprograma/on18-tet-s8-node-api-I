## Documentação

-[GET] "/filmes"
* retornar todos os filmes

-[GET] "/filmes/consulta/;id"
* retornar um filme por id

-[GET] "/filmes/:pesquisar"
* retornar filme por titulo
* retornar erro 404 com a mensagem: "filme não encontrado" caso clinte digitar nome errado

- [POST] "/filmes/cadastrar"
* cadastra novo filme