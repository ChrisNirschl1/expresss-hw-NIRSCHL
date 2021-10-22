const express = require("express");
const app = express();
const PORT = process.env.PORT ||3000;
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid');
const db = require('./db/db.json');
const { stringify } = require("querystring");

//middleware
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(express.json());


//saves notes as JSON, 
  app.get('/api/notes/', (req,res)=>{
    res.json(db)
  })

  //should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
  app.post('/api/notes', (req, res) => {
  const {title, text} = req.body
  console.log(req.body);
  const newNote = {
      title,
      text,
      id: uuid()
  }
  db.push(newNote)

  fs.writeFileSync('./db/db.json', JSON.stringify(db))

res.json(newNote)
   

});

app.get('/api/notes/:id', (req,res) =>{
    for (let i = 0; i < db.length; i++) {
       if (req.params.id == db[i]){
           return res.json(db[i])
       }
        
    }
})

//gets notes html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

  app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);