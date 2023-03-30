// funcion para que cargue las peliculas.
window.addEventListener("load",()=>{
    cargarPeliculas()
})
//API
// https://api.themoviedb.org/3/movie/popular?api_key=TUAPIKEY&language=es-MX&page=1

let pagina = 1; //variables para controlar la paginacion
const CANTIDAD_MAX_PAGINAS = 500;
const INDICE_INICIO_PAGINAS = 1;
const API_KEY = '73b96ddc25658ad17c90440e7f61bd67';

//capturo los elementos del DOM
const $d = document;
let btnAnterior = $d.querySelector("#btnAnterior");
let btnSiguiente = $d.querySelector("#btnSiguiente");

//Delegacion de eventos
$d.addEventListener('click', (e) => {
  if (e.target.id == 'btnAnterior'){
    //console.log('click en el BTN anterior');
    pagina = decrementarContador(pagina, INDICE_INICIO_PAGINAS, CANTIDAD_MAX_PAGINAS);
    cargarPeliculas()
  }
  if (e.target.id == 'btnSiguiente'){    
    //console.log('click en el BTN Siguiente');
    pagina = incrementarContador(pagina,CANTIDAD_MAX_PAGINAS);
    cargarPeliculas();
  }
});

const incrementarContador =  (contador, max) => {  
  return (contador % max ) + 1;
};
//console.log(incrementarContador(500, CANTIDAD_MAX_PAGINAS))

const decrementarContador = (contador, min, max) => {  
  return (contador - 1 < min) ? max : contador -1;  
}
//console.log(decrementarContador(1, 1, CANTIDAD_MAX_PAGINAS));

//funcion que carga las peliculas
const cargarPeliculas = async () => {
  const ENDPOINT_POPULARES = 'https://api.themoviedb.org/3/movie/popular';
  try {
    let respuesta = await fetch(
      `${ENDPOINT_POPULARES}?api_key=${API_KEY}&language=es-MX&page=${pagina}`
    );
     //console.log(respuesta)

    if (respuesta.status === 200) {
      const datos = await respuesta.json();              
      let $contenedor = $d.getElementById('contenedor');        
      let $fragmentPeliculas = $d.createDocumentFragment();
      console.log(datos);
         
      datos.results.forEach((pelicula) => {
        
        let $pelicula = $d.createElement('div');
          $pelicula.classList.add('pelicula');
        let $imgPelicula = $d.createElement('img');
          $imgPelicula.classList.add('poster');
          $imgPelicula.setAttribute('src', `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`); 
        let $h3Pelicula = $d.createElement('h3');
          $h3Pelicula.classList.add('titulo');
        let $tituloTexto = $d.createTextNode(`${pelicula.title}`);
          $h3Pelicula.appendChild($tituloTexto);

        $pelicula.append($imgPelicula);
        $pelicula.append($h3Pelicula);
        
        $fragmentPeliculas.append($pelicula);

      });   

      //Elimina todos los elementos hijos
      while ($contenedor.lastElementChild) {
        $contenedor.removeChild($contenedor.lastElementChild);
      }  
      //Agrego los elementos de la nueva pagina
      $contenedor.append($fragmentPeliculas);

    } else if (respuesta.status === 404) {
      console.log("lo buscado no esta disponible");
    }
  } catch (error) {
    console.log(error);
  }
  let titulo = $d.querySelector("#titulo").innerHTML = `Pagina ${pagina}`
};
