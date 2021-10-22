const express = require("express");
const app = express();
const PORT = process.env.PORT ||3000;
const path = require('path');
const fs = require('fs');
// const util = require('util');
// const db = require('./db/db.json');
const uuid = require('./helpers/uuid');


app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(express.json());


  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
  });

  app.get('api/notes/', (req,res)=>{
    res.json(JSON.parse(fs.readFileSync('./db/notes.json', 'utf8')))
  })

  app.post("/api/notes", (req, res) => {
    const { title, text } = req.body;
    
  });
 

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

  app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);