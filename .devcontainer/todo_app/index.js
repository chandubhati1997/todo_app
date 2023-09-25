const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const bodyParser = require("body-parser")

app.use(bodyParser.json());




app.get('/todo', (req, res) => {

  fs.readFile("todo.json","utf-8",(err,data) =>  {
    if(err) throw err;
    res.json(JSON.parse(data));
  })
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})