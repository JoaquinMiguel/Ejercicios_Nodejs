const express = require('express');
const validateData = require('./middlewares/middlewares')
const fs = require('fs');
//const { func } = require('joi');

const app = express();
const PORT = 8081;
let personas = [];

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(PORT, ()=> console.log(`serven escuchando en: http://localhost:${PORT}`));

(async function readData(){
    try{
        const data = await fs.promises.readFile(__dirname + '/personas.txt', 'utf-8');
        personas = JSON.parse(data);
    }catch (error){
        console.log(error);
    }
})();

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/files/index.html')
});

app.post('/', validateData, async (req, res) =>{  // minuto 47
    const body = req.body;
    personas.push(body);
    try{
        fs.writeFile('./src/personas.txt', JSON.stringify(personas), () =>{   // me pide cb sino tira error
            res.status(200).send('Grabado!');    
        });
        
    }catch(error){
        console.log(error);
    }
    
});

