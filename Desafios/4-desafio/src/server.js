// res.redirect();
const express = require('express');
const path = require('path');
const Contenedor = require('./Contenedor');
const uuid = require('uuid');

const app = express();
const PORT = 8080;

const unaLista = new Contenedor('products.txt');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('views', __dirname + '/../views');
app.set('view engine', 'pug');

app.listen(PORT, () => console.log(`Server activo en http://localhost:${PORT}`));


app.get('/', (req, res) => {
    res.render(path.join(__dirname,'../partials/menu'))
});

app.get('/productos', async (req, res) =>{ // async (req, res) PAPAAA

    //async function imprimir(){
        const unProducto = await unaLista.getAll();

        if(unProducto == null) res.status(400).send('No existe documentacion, ingrese un producto')
        else{
            res.status(200).render('index',{
                unProducto,
            })
        }
   // }
    //imprimir();
    
})

app.get('/producto/:id', async (req, res) =>{

   // async function imprimir(){
        const {id} = req.params;
        let product = await unaLista.getById(id);
    
        //console.log(product, 'la posta');
        res.render('productos', {
            product
        })
        
    //}
    //imprimir();
})

app.get('/formulario', (req, res) =>{
    res.render('formulario');
})

app.post('/formulario', (req, res) =>{
    const data = req.body;
    unaLista.save(data);

    res.redirect('/');
})

