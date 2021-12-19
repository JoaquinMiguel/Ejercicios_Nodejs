const joi = require('joi');

const schema = joi.object({ // fijarse en la documentacion npm joi
    nombre: joi.string()
        .min(3)
        .max(30)
        .required(),

    apellido: joi.string()
        .min(3)
        .max(30)
        .required(),

    edad: joi.number()
        .min(20)
        .max(100)
        .required(),

    email: joi.string()
        .email({ tlds: {allow: false} })
})

async function validateData(req, res, next){
    const {body} = req;
    try{
        await schema.validateAsync(body);
        next();
    }catch(error){
        next(error);
    }
    //next();
}

module.exports = validateData;
