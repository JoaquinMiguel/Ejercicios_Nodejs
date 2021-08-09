// hacer archivo txt con 3 productos y utilizarla
const Contenedor = require('./desafio2');
const express = require('express');
const app = express();
const PORT = 8080;

var fs = require('fs');

const cajon = new Contenedor('./src/productos.txt');
(async function funcMostrar() {
    await cajon.save({title:"manzana",price:100,url:"otraURL"});
    await cajon.save({title:"Banana",price:60,url:"otraURL"});
    await cajon.save({title:"Naranja",price:80,url:"otraURL"});
})();

const server = app.listen(PORT, () => {
    console.log(`Server corriendo en port ${PORT}`)
})
server.on('error', (error) => console.log(error))

app.get('/', (req, res, next) =>{
    res.send('Hola servidor  <br/>By Joacardo')
})

app.get('/productos', (req,res) => {
    async function TodosLosPorductos(){
        res.send(await cajon.getAll());
    }
   TodosLosPorductos(); //
})

app.get('/productoRandom', (req, res) => {
    async function elementoRandom(){
        let max = cajon.productos.length;
        let random = Math.floor(Math.random()*((max+1)-1))+1
        let resultado = JSON.stringify(await cajon.getById(random));
        res.send(`${resultado}`); 
    }
    elementoRandom();
})