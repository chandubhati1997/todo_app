const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const bodyParser = require("body-parser")

app.use(bodyParser.json());

function findIndex(arr,id){
  for(let i=0;i<arr.length;i++){
    if(arr[i].id===id) return i;
    

  }
  return -1;
}







app.get('/todo', (req, res) => {

  fs.readFile("todo.json","utf-8",(err,data) =>  {
    if(err) throw err;
    res.json(JSON.parse(data));
  })
})

app.get("/todo/:id",(req,res) => {
  fs.readFile("todo.json","utf-8",(err,data) =>{


    if (err) throw err;

    const todos =JSON.parse(data)
    const todoindex =findIndex(todos,parseInt(req.params.id));
    if(todoindex=== -1){
      res.status(404).send();
    }else{
      res.json(todos[todoindex]);

    }
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





app.delete("/todo/:id",(req,res) => {
   fs.readFile("todo.json",(err,data)  =>  {
      if (err) throw err;
      const todos= JSON.parse(data);
      const todoindex=findIndex(todos,parseInt(req.params.id));
      if(todoindex===-1){
        res.status(404).send()
      }
      else{
        todos=removeAtIndex(todos,todoindex);
        res.status(201).send();
        
      }

   } )



})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})