console.log("FIle Upload Program")

import express from 'express'
import Busboy from 'busboy'

const app = express()

app.get('/check', (req, res)=>{
    return res.json({kyaHalChal: 'Sb theek hai'})
})
app.post('/upload', (req, res)=>{

    
    return res.json({tyep:'sb shi hai'})
})

app.listen(3002, ()=>{
    console.log("Server is up on port 3002 ")
})