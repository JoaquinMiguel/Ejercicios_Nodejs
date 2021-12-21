const joi = require('joi');

const schema = joi.object({ // fijarse en la documentacion npm joi
    title: joi.string()
        .min(3)
        .max(30)
        .required(),

    precio: joi.number()
        .min(0)
        .required(),
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