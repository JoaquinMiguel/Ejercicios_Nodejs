const fs = require('fs');

class Contenedor{

    constructor(archName){
        this.nombreArch = archName;
        this.productos = [];
        this.id = 0;
    }

    async save(objeto){

        this.productos.push(objeto);
        try{
            fs.promises.writeFile(this.nombreArch, JSON.stringify(this.productos))

            //console.log(`Archivo guardado`);
            this.id++;
            return console.log(`ID asignado: ${this.id}`);
        } catch (error){
            console.log(error);
        }
    }

    async getById(num){ // id y devuelvo obj o null
        try{
            return this.productos[num];
        } catch(error){
            return null;
        }
    }

    async getAll(){
        try {
            const contenido = await fs.promises.readFile(this.nombreArch,"UTF-8");

            return JSON.parse(contenido);
            //return (this.productos);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(num){
        try{
           console.log('\nObjeto eliminado ' + JSON.stringify(this.productos[num].title)); 
           this.productos.splice(num,1); // el delete no lo elimina del todo, queda como objeto indefinido

           fs.promises.writeFile(this.nombreArch, JSON.stringify(this.productos));
        } catch{
            if (num != productos[num]) return console.log('ese id no existe o ya fue eliminado');
            console.log('error al eliminar');
        }
        
    }

    async deleteAll(){
        try{
            fs.promises.writeFile(this.nombreArch, '[]');

            console.log('se ha borrado todo');
        } catch(error){
            console.log(error);
        }
    }
}

module.exports = Contenedor;