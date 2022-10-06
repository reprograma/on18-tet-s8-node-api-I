# Título

API Filmes e Séries

## Índice

- [Sobre](#about)
- [Como Rodar](#getting_started)
- [Como Usar](#usage)

## Sobre <a name = "about"></a>

API Feita com Express JS para simular a busca de dados de um arquivo json com async/await

## Como Rodar <a name = "getting_started"></a>

### Prerrequisitos

Git
Node & NPM

### Installing

Clonar o repositório:

```
git clone https://github.com/hoxas/on18-tet-s8-node-api-I
```

Entrar na pasta do projeto

```
cd exercicios/para-casa
```

Instalando e rodando

```
npm install
npm run start
```

## Como usar <a name = "usage"></a>

A API segue o padrão REST com duas rotas principais e os verbos get e post disponíveis:

```
/filmes
/series
```

Com o GET é possível puxar a lista completa de dados de sua respectiva rota.

(Exemplos com CURL)

```
curl http://localhost:3636/filmes
```

Também é possível buscar por chaves/valores específicos sendo o ID a prioridade.

```
curl http://localhost:3636/filmes?id=1
curl http://localhost:3636/filmes?genre=action
```

E com o método POST podemos postar nas respectivas rotas com os seguintes parâmetros no body:

```
{
  "title": "Titulo do filme/serie",
  "description": "Descrição do filme/serie"
}
```

OBS: O nome da chave na busca por chave/valor é case-sensitive ou seja depende de estar com a mesma capitalização que a database.
