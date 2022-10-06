# Documentação

## Reprogramaflix

- Explicação do projeto: para os dois jsons (filmes e series) crie as rotas de retorno de todos os filmes, por id, por titulo e por qualquer chave/valor. Crie a rota de criação de filme e serie. DESAFIO: encontre caso de erro.

- [GET] "/filmes"
    * Retornar todos os filmes
- [GET] "filmes/pesquisar/:id"
    * Retorna um filme por id 
- [GET] "filmes/pesquisar/:titulo"
    * Retorna filme por título
    * Retorna erro 404 com a mensagem: "filme não encontrado" caso o cliente digitar nome errado
- [GET] "filmes/pesquisar/:chave/valor"
    * Retorna filme por chave/valor
- [POST] "/filmes/cadastrar"
    * Cadastra um novo filme 

- [GET] "/series"
    * Retornar todas as series
- [GET] "series/pesquisar/:id"
    * Retorna uma série por id 
- [GET] "series/pesquisar/:titulo"
    * Retorna serie por título
    * Retorna erro 404 com a mensagem: "serie não encontrada" caso o cliente digitar nome errado
- [GET] "series/pesquisar/:chave/valor"
    * Retorna serie por chave/valor
- [POST] "/series/cadastrar"
    * Cadastra um novo filme 

