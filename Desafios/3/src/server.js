const express = require('express');
const { Router } = require('express');
const path = require('path');
const { uploadSingle } = require('./middleware/uploadFile');
const validateData = require('./middleware/validate');

const app = express();
const PORT = 8080;
const routerProducts = new Router();

let listProducts=[];    //JSONparse
let numId =1;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/productos', routerProducts);

app.listen(PORT, () => console.log(`Server inciado http://localhost:${PORT}/public`));


app.get('/public', (req, res) => {
    res.sendFile( path.join(__dirname,'../public/index.html') )
});


routerProducts.get('/', (req, res) =>{
    res.send(listProducts);
});

routerProducts.get('/:id', (req, res) =>{    // segun id
     let num = req.params.id -1;

     if ( (num >= 0) && (num < listProducts.length) && (typeof(num) == "number") ){
         res.send(listProducts[num]);
     } else{
         res.status(400).send({error: 'producto no encontrado o caracter incorrecto'})
     }
     
});

routerProducts.post('/', uploadSingle, validateData,(req, res) =>{   //hacer un middleware de validacion
    const body = req.body;
    body.id = numId;
    listProducts.push(body);
    numId++;
    
    res.status(200).send('grabado');
});

routerProducts.put('/:id', (req, res) =>{
    const num = req.params.id - 1;
    const newProducto = req.body;
    const borrada = listProducts[num];
    const newId = num + 1;

    if(num > listProducts.length && typeof(mum) !== 'number'){
       res.send('error');
    }else{
        listProducts[num] = newProducto;
        listProducts[num].id= newId;
        res.json({
            actualizado: newProducto,
            borrado: borrada
        })
    }
})

routerProducts.delete('/:id', (req, res) =>{
    const id = req.params.id;
    const borrada = listProducts[id -1];

    delete listProducts[id -1];
    res.json({palabra_eliminada: borrada})
})
