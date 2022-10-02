function bancoDeDados(){
    return new Promise((resolve)=>{

    })
}

//começa nosso servidor

const express = require("express")
const app = express()

app.use(express.json())

app.get("")


app.listen(1313, ()=>{
    console.log("Tomem cuidado nas votações")
})