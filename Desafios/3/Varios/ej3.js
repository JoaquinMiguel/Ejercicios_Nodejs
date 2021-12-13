const express = require('express');
const { isQualifiedName } = require('typescript');
const { Router } = express;   //Router = express.Router;

const app = express();
//const __dirname = './';
const mascotas = new Router();
const personas = new Router();

const listaP =[];
const listaM = [{
    nombre: "jorge",
    raza: "manco",
}];

app.use(express.json());        // es un must para q entienda JOSN
app.use(express.urlencoded({extended: true}));

app.use('/static', express.static(__dirname + '/public')); 
//app.use(express.static('public'))

app.use('/mascotas', mascotas);
app.use('/personas', personas);

app.listen(8083, () =>{ console.log(' server activo')});

mascotas.get('/', (req, res) =>{
    res.send(listaM);
});

mascotas.post('/', (req, res) =>{
    const {nombre, raza} = req.body;

    if (isNaN(nombre) && isNaN(raza)){
        listaM.push({nombre: nombre, raza: raza});
        res.status(200).send('Esta todo en orden');

    }else res.status(400).send('Tipo de dato erroneo');
    
})

personas.get('/', (req, res) =>{
    res.send(listaP);
})

personas.post('/', (req, res) =>{
    const {nombre, apellido} = req.body;

    if (isNaN(nombre) && isNaN(apellido)){
        listaM.push({nombre: nombre, apellido: apellido});
        res.status(200).send('Esta todo en orden');

    }else res.status(400).send('Tipo de dato erroneo');
});

app.get('/public', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
});

