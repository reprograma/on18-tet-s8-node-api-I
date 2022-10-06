//summon express
const express = require("express")

//start up express
const app = express()

// set up GET route
app.get("/", (request, response) =>{
    //RESPONSE.STATUS(XXXX).JSON()
    response.status(200).json(["Uhul JS"])
 })

app.get("/oi", (request, response)=>{
    response.status(200).json([{
        mensagem: "oi coisa linda"
    }])
})

//start up server
app.listen(8080, ()=>{
    console.log("servidor OK!")
})