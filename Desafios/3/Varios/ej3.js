const express = require('express');
const { Router } = express;   //Router = express.Router;

const app = express();
const mascotas = new Router();
const personas = new Router();

app.use(express.json());        // es un must para q entienda JOSN
app.use(express.urlencoded({extended: true}));

app.listen(8083, () =>{ console.log(' server activo')});

const listaP = [{
    nombre: "jorge",
    raza: "manco",
}];

mascotas.get('/mascotas', (req, res) =>{
    res.send(listaP);
});

mascotas.post('/mascotas', (req, res) =>{
    const {nombre, raza} = req.body;

    listaP.push({nombre: nombre, raza: raza});
    res.send('GOOOOOOOOOOD');
})

app.use('/', mascotas);

