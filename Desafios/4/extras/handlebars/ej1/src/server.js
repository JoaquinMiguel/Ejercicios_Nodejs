// la forma de hacer mas nefasta
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('ntl', (filePath, options, cb) =>{
    fs.readFile(filePath, (err, content) =>{
        if(err) return cb(new Error(err));

        const rendered = content
            .toString()
            .replace('#title#', options.title)
            .replace('#message#', options.message)

        return cb(null, rendered);
    })
})


app.set('views', path.join(__dirname, '../views'));   //donde van a estar los views (index.js)
app.set('view engine', 'ntl');


app.get('/', (req, res) => {
    res.render('index', {   //renderiza el archivo index. busca arch index con ext .ntl
        title:"Este es el titulo",
        message:"Este es el mensaje"
    })
});


app.listen(port, () => console.log(`Server activo en http://localhost:${port}`));

/*app.get('/public', (req, res) => {
    res.sendFile(__dirname + './public/index.html')
});
*/