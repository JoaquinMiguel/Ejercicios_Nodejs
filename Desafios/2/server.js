const Contenedor = require('../1/Contenedor');
const express = require('express');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const server = app.listen(PORT, () => {
    console.log(`---- Servidor escuchando en puerto: ${PORT} ----`);
});
// manejo de error
server.on("error", error => console.log(`Error en servidor ${error}`));

const cajon = new Contenedor('./productos.txt');

(async function funcMostrar() {
    await cajon.save({title:"manzana", price:100, url:"https://media.istockphoto.com/vectors/simple-apple-in-flat-style-vector-illustration-vector-id1141529240"});
    await cajon.save({title:"Banana", price:60, url:"otraURL"});
    await cajon.save({title:"Naranja", price:80, url:"otraURL"});
})();


app.get('/productos', (req, res) =>{
    async function imprimir(){  // hago async para q esta todo en orden y no halla errores
        res.status(200).send( await cajon.getAll());  
    }
    imprimir();
})

app.get('/productoRandom', (req, res) =>{
    (async function random() {
        let max = cajon.productos.length;
        let random = Math.floor(Math.random() * (max) );
        let answer = JSON.stringify( await cajon.getById(random) ) ;

        res.send(answer);
    })();
    
})


