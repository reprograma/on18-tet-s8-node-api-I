const express=require('express')

const app=express()
const porta=3000

app.get('/',(resquest,response)=>{
    response.status(200).json(['deu certo lalalal'])
})

app.listen(porta,()=>{
    console.log('servidor esta rodando')
})