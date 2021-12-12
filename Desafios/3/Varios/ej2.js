const express = require('express');
const app = express();
const PORT = 8082;

let frase = '<b>Que la fuerza te acompañe</b>';
let arrFrase = frase.split(' ');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/server', (req, res) => {
    res.send({server: 'Express'})
});
app.listen(PORT, () => console.log(`Server activo en http://localhost:${PORT}`));

// -------------------------------------------------------------
app.get('/api/frase', (req, res) => {
    res.send(frase);
});

app.get('/api/palabras/:pos', (req, res) => {
    const posicion = req.params.pos;
    let aux = frase.split(' ');

    res.send('<b>'+ aux[posicion - 1] + '</b>');
});

app.post('/api/palabras', (req, res) =>{
    const { palabra } = req.body;

    arrFrase.push(palabra);
    frase = arrFrase.join(' ');

    res.json({
        agregada: palabra,
        posicion: arrFrase.length,
    });
    res.status(500).send('error del servidor');
});

app.put('/api/palabras/:pos', (req, res) => {
    const palabra = req.body.palabra;
    const posicion = req.params.pos -1;

    const borrada = arrFrase[posicion];

    if (typeof palabra === 'string'){
        arrFrase[posicion] = palabra;
        frase = arrFrase.join(' '); 

        res.json({
            actualizada: palabra,
            anterior: borrada,
        });
    }else res.send({error: 'Tipo de dato invalido'});

});

app.delete('/api/palabras/:pos', (req, res) =>{
    let posicion = req.params.pos -1;
    let eliminada = arrFrase.splice(posicion,1);
    
    frase = arrFrase.join(' '); 

    res.json({palabra_eliminada: `${eliminada}`});
});
