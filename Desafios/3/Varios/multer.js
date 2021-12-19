const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({ // documentacion npm multer
    destination: function (req, file, cb) {
      cb(null, __dirname + '/uploads')
    },
    filename: function (req, file, cb) {
      //const hoy = new Date(); 
      cb(null, file.originalname ) // le puedo agregar la fecha
    }
});
  
const upload = multer({ storage: storage })
const PORT = 8086;
const app= express();

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname +'/public/file.html');
});

app.post('/profile', upload.single('myFile'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log(req.file, req.body);
    res.send('esta todo OK');
});


app.listen(PORT, ()=>{
    console.log(`server activo en: ${PORT}`);
});



