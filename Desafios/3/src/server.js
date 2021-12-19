const { Router } = require('express');
const express = require('express');

const app = express();
const PORT = 8080;
const products = new Router();

let products=[];
let id =[];

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(PORT, () => console.log(`Server inciado https://localhost:${PORT}`));

app.use('/api/productos', products);

products.get('/', (req, res) =>{
     
});

products.get('/:id', (req, res) =>{    // segun id
     
});