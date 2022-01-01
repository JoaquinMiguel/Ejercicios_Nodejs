const express = require('express');
//const path = require('path');

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// setea views = ./views => app.get('views') --> ./views
app.set('views', __dirname + '/../views');  // carpeta de las plantillas
app.set('view enginge', 'pug'); // va a ser extension .pug

app.get('/', (req, res) => {
	res.render('index.pug', {
		title: 'Este es un titulo',
	})
})

app.get('/meter', (req, res) =>{
  const { query } = req;
	res.render('meter.pug', {		//se pasa la data
      ...query, // convierte en una lista de argumentos
	})
});

function errorHandler(err, req, res, next){
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
}

app.use(errorHandler);


app.listen(port, () => console.log(`Server activo en http://localhost:${port}`));

// min 22