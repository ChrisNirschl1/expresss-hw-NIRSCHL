const express = require("express");
const app = express();
const PORT = process.env.PORT ||3000;
const path = require('path');
const fs = require('fs');
const util = require('util');
const db = require('./db/db.json');


app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.get('api/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

  app.get('/get', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
  });

  app.get('api/notes/', (req,res)=>{

  })



app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
});