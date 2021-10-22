const express = require("express");
const app = express();
const PORT = process.env.PORT ||3000;
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid');


//middleware
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(express.json());

//gets notes html
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
  });
//saves notes as JSON, if i got that far
  app.get('api/notes/', (req,res)=>{
    res.json(JSON.parse(fs.readFileSync('./db/notes.json', 'utf8')))
  })

  //pushes note to json file
  app.post('/api/notes', (req, res) => {
    const {title, text} = req.body;
    const newNote = {
        title, 
        text, 
        id: uuid(),
    };

    const noteChange = JSON.stringify(newNote);
    
    fs.writeFile('./db/db.json', noteChange, (err) =>
    err ? console.error(err): console.log("New note pushed to JSON file.")
    );
    
});


  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

  app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);