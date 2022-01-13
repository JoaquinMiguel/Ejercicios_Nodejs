const fs = require('fs');

class Contenedor{

    constructor(archName){
        this.nombreArch = archName;
        this.productos = [];
        //this.id = 0;
    }

    async save(objeto){
        
        await this.chequear();

        this.productos.push(objeto);

        await this.acomodoId();
        try{
            fs.promises.writeFile(__dirname +'/' + this.nombreArch, JSON.stringify(this.productos)) //this.productos

            //console.log(`Archivo guardado`);
            
            //this.id++;
            //return console.log(`ID asignado: ${this.id}`);
        } catch (error){
            console.log(error);
        }
        console.log(this.productos, 'final')
    }

    async getById(num){ // id y devuelvo obj o null
        try{
            const cont = await this.getAll();
            return cont[num-1];

            //return cont.filter(prod => prod.id == num)[0];
            // PORQUE TENGO Q PONERLE ARRGLE [0]
        } catch(error){
            return null;
        }
    }

    async getAll(){
        try {
            const contenido = await fs.promises.readFile(__dirname +'/' + this.nombreArch,"UTF-8");
            //console.log(contenido, 'es el get')
            return JSON.parse(contenido);
            //return (this.productos);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async deleteById(num){
        try{
           console.log('\nObjeto eliminado ' + JSON.stringify(this.productos[num].title)); 
           delete this.productos[num-1];
           //this.productos.splice(num,1); // el delete no lo elimina del todo, queda como objeto indefinido

           fs.promises.writeFile(__dirname +'/' + this.nombreArch, JSON.stringify(this.productos));
        } catch{
            if (num != productos[num]) return console.log('ese id no existe o ya fue eliminado');
            console.log('error al eliminar');
        }
        
    }

    async deleteAll(){
        try{
            fs.promises.writeFile(__dirname +'/' + this.nombreArch, '[]');

            console.log('se ha borrado todo');
        } catch(error){
            console.log(error);
        }
    }

    async acomodoId(){ // problema aca con el var productos

        for (let i=0; i< this.productos.length; i++){
            //if (this.productos[i].id == undefined) this.productos.id = i+1;

            this.productos[i].id = i+1;
            //console.log(this.productos[i].id)
        }

    }

    async chequear(){
        const cosas = await this.getAll();
        this.productos = [];
        if (cosas != null){
            for( let i=0; i< cosas.length; i++){
                this.productos.push(cosas[i]);
            }
        }
    
        //console.log(this.productos, 'lista productos')
    }
}

module.exports = Contenedor;