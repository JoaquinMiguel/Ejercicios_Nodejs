const Contenedor = require('./desafio2');

const cajon = new Contenedor('ejemplo.txt');

(async function funcMostrar() {
  await cajon.save({title:"manzana",price:100,url:"otraURL"});
  await cajon.save({title:"Banana",price:60,url:"otraURL"});
  await cajon.save({title:"Naranja",price:80,url:"otraURL"});

  console.log(await cajon.getAll());
  console.log('\nmetodo getById', await cajon.getById(2));

  await cajon.deleteById(2);
  console.log(await cajon.getAll());

  await cajon.deleteAll();
})();
