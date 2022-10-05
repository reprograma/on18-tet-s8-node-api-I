 const { request, response } = require("express")
const express = require("express")
 const app = express()

 app.use(express.json)


 app.get("/filmes",(request, response)=>{
    let dbFilmes = bancoDeDados()
 })












 app.listen(1313, ()=>{
    console.log("Tomem cuidado no dia das eleições")
 })