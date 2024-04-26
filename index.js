
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const port = process.env.PORT || 5000


// middleware 
app.use(cors())
app.use(express.json())

app.get("/", (req, res)=> {
    res.send("assignment ten server side is  running")
})

app.listen(port, ()=>{
    console.log(`assignment 10 server side is running on port : ${port} `)
})