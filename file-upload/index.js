console.log("FIle Upload Program")

import express from 'express'
import Busboy from 'busboy'
import path from 'path'
import crypto from 'crypto'
import fs from 'fs'

const app = express()

app.get('/check', (req, res)=>{
    return res.json({kyaHalChal: 'Sb theek hai'})
})
app.post('/upload', (req, res)=>{
    const busboy = Busboy({headers: req.headers, limits:{fileSize:200*1024*1024}})


    busboy.on('file',(fieldname, file, info)=>{

        const {filename, mimeType} = info

        const allowedType = ['image/png', 'image/jpeg', 'application/pdf', 'video/mp4']

        let saved = false;

        if(!allowedType.includes(mimeType)){
            file.resume()
            return res.status(400).json({ok: false, error: 'invalid file type'})
        }

        const safeName = crypto.randomBytes(8).toString('hex') + path.extname(filename)
        // const saveTo = path.join('uploads', safeName) [QUESTION: Why not use this?]
        const saveTo = path.join(process.cwd(), "uploads", safeName);


        const writeStream = fs.createWriteStream(saveTo)
        file.pipe(writeStream)


        file.on('limit', ()=>{
            writeStream.destroy()

            fs.rmSync(saveTo, {force:true})
            return res.status(413).json({ok:false, error: 'file too large'})

        })

        writeStream.on('finish', ()=>{
            saved = true;

            return res.json({ok: true, filename: saveTo, mimetype: mimeType})
        })

        writeStream.on('error', (e)=>{

            return res.status(500).json({ok:false, message: e.message})
        })

       
    })

     busboy.on('error', (e)=>{
            return res.status(400).json({ok:false, error: e.message})
        })
    req.pipe(busboy)
    // return res.json({tyep:'sb shi hai'})
})

app.listen(3002, ()=>{
    console.log("Server is up on port 3002 ")
})