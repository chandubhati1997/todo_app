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

app.post('/todo',(req,res) => {

    const newtodo = {
        id: Math.floor(Math.random()*1000000),  //unique number every time id is generated
        title: req.body.title,
        description: req.body.description

    } 

    fs.readFile("todo.json","utf-8",(err,data) =>{
        if(err) throw err;
        const todos =JSON.parse(data)
        todos.push(newtodo);

        fs.writeFile("todo.json",JSON.stringify(todos),(err) => {
            if(err) throw err;
            res.status(201).json(newtodo);
        })

    })


})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})