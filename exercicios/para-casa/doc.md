# documentação
Para os dois jsons (filmes e series) criar as rotas de retorno para:
- todas os dados
- por id
- por titulo
- por qualquer chave/valor

As rotas devem ser criadas para Filmes e Series

---
- **1A** [GET] "/filmes"
    *retornar todos os filmes
- **1B** [GET] "/series"
    *retornar todas as séries
- **2A** [GET] "/filmes/:id"
    *retornar um filme por ID
- **2B** [GET] "/series/:id"
    *retornar uma série por ID
- **3A** [GET] "filmes/pesquisar/c/titulo"
    *retorna filme por titulo
    *retornar erro 404 com a mensagem "filme não encontrado" caso cliente digitar nome errado
- **3B** [GET] "series/pesquisar/c/titulo"
    *retorna série por titulo
    *retornar erro 404 com a mensagem "série não encontrada" caso cliente digitar nome errado
- **4A** [GET] "filmes/pesquisar/p/:parcial"
    *retorna filme por titulo parcial
    *retornar erro 404 com a mensagem "filme não encontrado" caso cliente digitar palavra que não esteja presente em nenhum título
- **4B** [GET] "series/pesquisar/p/:parcial"
    *retorna série por titulo parcial
    *retornar erro 404 com a mensagem "série não encontrada" caso cliente digitar palavra que não esteja presente em nenhum título

---
