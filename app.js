const express = require('express');
const fs = require('fs');
const path = './public/uploads';
const app = express();
const multer = require("multer");
const upload = multer({ dest: path});
const uploadedFiles = [];

app.use(express.static('public'));
app.use(express.json())
app.set('view engine','pug');

app.get('/', function (req, res) {
  fs.readdir('./public/uploads', function (err, items) {
    res.render('index', {title: 'KenziePug', items: items})
  })
})

app.post('/', upload.single('image'), function (request, response, next) {
  let file = request.file.filename;
  console.log("Uploaded: " + file);
  uploadedFiles.push(file);
  fs.readdir('./public/uploads', function (err, items) {
    console.log(items);
  response.render('upload', {title: 'KenziePug', val:file});
  })
})

app.post('/latest', (request, response) => {
    fs.readdir(path , (error, items) => {
      let motified = ''
      let latestPost = request.body.after
      let timestamp = 0;
      let images = []
      items.forEach(item => {
        motified = fs.statSync(`./public/uploads/${item}`).mtimeMs;
        console.log(motified)

          if(motified > latestPost){
            images.push(item);
          //  motified = latestPost;
          }
          if(motified > timestamp){
            timestamp = motified 
          }
      })
      response.send({"images":images  , "latestPost": timestamp})
    })
})

app.listen(3000);