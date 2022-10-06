const { request, response } = require("express");
const express = require("express");
const filmes = require("./data/filmes.json");


function bancoDeDados() {
    return new Promise((resolve)=>{
        setTimeout(() => {
            return resolve({
                series: require("./data/series.json"),
                filmes: require("./data/filmes.json")
            })
                
        }, 1500);
    })
}

console.log("🐼🦝🐼");

const app = express();
app.use(express.json());

app.get("/", (request, response)=>{
    response.status(200).json(["Gundam Type RX-78-2"])
})

//-------------------filmes----------------------------//
app.get("/movies", async (request, response)=>{
    
    let movies = await bancoDeDados();

    response.status(200).send(movies.filmes)
      

})

app.get("/movies/search", async (request, response)=>{
    let titleRequest = request.query.title.toLowerCase();
    
    perTitle();
    async function perTitle(){
    try{
        let dbFilmes = await bancoDeDados();
        let filmeEncontrado = dbFilmes.filmes.filter(
            filme => filme.Title.toLowerCase().includes(titleRequest))
    
        response.status(200).send(filmeEncontrado);

    }
    catch (error) {
        console.log("Nani?")
    }
    }


    
    
})

/*async function getDataFromDataBase() {
    const DataBase = await bancoDeDados;
    return DataBase.filmes;

}*/


app.listen(8080, ()=>{
    console.log("Nya is Running");
})
  
  