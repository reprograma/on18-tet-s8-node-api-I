const express = require("express");
const doushijinJson = require("./data/sunrise.json");

console.log("🐼🐼🐼");

const app = express();

app.get("/", (request, response)=>{
    response.status(200).json(["Gundam Type 78"])
})

app.get("/doushijin", (request, response)=>{
    response.status(200).json({
        mensagem: "mangas",
        data:doushijinJson
    })

    
})


app.listen(8080, ()=>{
    console.log("Nya is Running");
})