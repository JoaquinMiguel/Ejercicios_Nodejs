const fs = require('fs');

class Contenedor {
    constructor(ruta) {
        this.nombreDeArchivo = ruta;
        this.productos = [];
    }
    async getAll() {
        try {
            const contenido = await fs.promises.readFile(this.nombreDeArchivo,"UTF-8");
            if (contenido){
                this.data = JSON.parse(contenido);
                return (this.data);
            }
        } catch (error) {
            return
        }
    }
    async save(objeto){
        await this.getAll();
        this.productos.push(objeto);        
        try {
            objeto.id = this.productos.length;
            await fs.promises.writeFile(this.nombreDeArchivo, JSON.stringify(this.productos));
        } catch (error) {
            return null;
        }
    }
    async getById(num) {
        await this.getAll(); 
        
        try {
            const lista = this.productos.find(producto => producto.id === num);
            return(lista);
        }catch{
            return null;
        }
    }
    async deleteById(num){
        try {
            let array = await this.getAll();
            const actualizado = array.filter( producto => producto.id !== num);
            await fs.promises.writeFile(this.nombreDeArchivo, JSON.stringify(actualizado));
        } catch (error) {
            return null;
        }
    }
    async deleteAll() {
        await fs.promises.writeFile(this.nombreDeArchivo,"[]");
    }
}
//const cajon = new Contenedor('archivo.txt');
//(async function funcMostrar() {
    //await cajon.save({title:"manzana",price:100,url:"otraURL"});
    //await cajon.save({title:"Banana",price:60,url:"otraURL"});
    //await cajon.save({title:"Naranja",price:80,url:"otraURL"});
    //console.log(await cajon.getAll());
    //console.log(await cajon.getById(2) , 'metodo getById');
   //await cajon.deleteById(3);
   //console.log(await cajon.getAll(),'Con id borrado');
   //await cajon.deleteAll();
//})();

module.exports = Contenedor;
