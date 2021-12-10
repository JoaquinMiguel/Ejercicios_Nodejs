const express = require('express');
const app = express();

const PORT = 8081;
const frase = 'Holasa wachin';

app.listen(PORT, () =>{
    console.log('server activo');
});

app.get('/api/frase', (req, res)=>{
    res.send(frase);
})

app.get('/api/letras/:num', (req, res) => {
    const num = req.params.num;

    try{
        if (isNaN(num)){
            res.json({error: "El parametro no es numerico"})
        }else if (num<1 || num >frase.length){
            res.json({error: "El parametro esta fuera de rango"})
            
        }else res.status(200).send(frase[num-1]);

    }catch(error){
        console.log(error);
    }
    
})