const express = require('express');
const cors = require('cors');
require('dotenv').config()
const multer = require('multer')
const color = require('colors')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage})

var app = express();

const errorHandler = (req, res, err) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.log('Multer Error'.bgRed.black)
        res.send('Multer Error')
        
      } else if (err) {
        // An unknown error occurred when uploading.
        console.log('Unknown Error'.bgRed.black)
        res.send('Unknown Error')
      }
  
      // Everything went fine.
    }


app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse' , upload.single('upfile'), (req , res, next)=>{
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  })
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
