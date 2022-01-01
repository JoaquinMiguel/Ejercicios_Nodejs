const express = require('express');
const emoji = require('node-emoji'); // una pelotudez
const uuid = require('uuid');
// min 20 after 5
const app = express();
const PORT = 8080;

const productos = [
    {
        id: uuid.v4(),
        name: 'Producto 1',
        description: 'Desciption 1',
        image: 'https://cdn3.iconfinder.com/data/icons/supermario/PNG/Paper-Mario.png' // iconfinder, buscar en google
    },
    {
        id: uuid.v4(),
        name: 'Producto 2',
        description: 'Desciption 2',
        image: 'https://cdn3.iconfinder.com/data/icons/iconshockluminasupermario/MAC/png/128/boo.png' // iconfinder, buscar en google
    },
    {
        id: uuid.v4(),
        name: 'Producto 3',
        description: 'Desciption 3',
        image: 'https://cdn2.iconfinder.com/data/icons/superheroes-set/128/spiderman-128.png' // iconfinder, buscar en google
    }
]

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('views', __dirname + '/../views');
app.set('view engine', 'pug');


app.get('/', (req, res) => {
	res.render('index', {
		productos,
	})
})

app.get('/producto/:id', (req, res) => {
	const { id } = req.params
	const product = productos.filter( producto => {
		console.log(producto.id, id)
		if (producto.id === id) {
			console.log('entra')
			return producto
		}
	})[0] // lo pongo en el primero del arreglo. 
    //el UUID siempre tiene un id distinto
	res.render('producto', {
		product,    //el producto es un arreglo
	})
})

app.get('/create', (req, res) => {
	res.render('formulario')
})

app.post('/', (req, res) => {
    const data= req.body;
    data.id = uuid.v4();
    productos.push(data);

    console.log(emoji.get("ballot_box_with_check", 'Grabado!'));
    res.status(200).send('<div><h3>Grabado!</h3><button><a href="/">Regresar</a></button></div>')
});


app.listen(PORT, () => console.log(emoji.get('pizza'),`Server activo en http://localhost:${PORT}`));

