const express = require('express');
const { Router } = express;   //Router = express.Router;

const app = express();
const mascotas = new Router();
const personas = new Router();

app.use(express.json());        // es un must para q entienda JOSN
app.use(express.urlencoded({extended: true}));

app.listen(8083, () =>{ console.log(' server activo')});

const listaM = [{
    nombre: "jorge",
    raza: "manco",
}];

const listaP =[];

mascotas.get('/mascotas', (req, res) =>{
    res.send(listaM);
});

mascotas.post('/mascotas', (req, res) =>{
    const {nombre, raza} = req.body;

    if (typeof nombre === 'string' && typeof raza === 'string'){
        listaM.push({nombre: nombre, raza: raza});
        res.status(200).send('Esta todo en orden');
    }else res.status(400).send('Tipo de dato erroneo');
    
})

personas.get('/personas', (req, res) =>{
    res.send(listaP);
})

personas.post('/personas', (req, res) =>{
    const {nombre, apellido} = req.body;

    if (typeof nombre === 'string' && typeof apellido === 'string'){
        listaM.push({nombre: nombre, apellido: apellido});
        res.status(200).send('Esta todo en orden');
    }else res.status(400).send('Tipo de dato erroneo');
})

app.use('/mascotas', mascotas);
app.use('/personas', personas);

