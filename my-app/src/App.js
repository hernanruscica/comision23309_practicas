import logo from './logo.svg';
import './App.css';
import './botones.css';
import { useState } from 'react';

const usuario = {
  nombre : 'pepe',
  edad: 20,
  foto: 'image123.jpg'
}

const colores = [{
  nombre: 'rojo',
  id: 0},
  {nombre: 'verde',
  id: 1},
  {nombre: 'rojo',
  id: 2}
]

function Perfil() {
  return (
    <>
      <h1>{usuario.nombre}</h1>
      <img src={usuario.foto} alt = 'imagen de perfil'>
      </img>
    </>
  )
}



function Mylista() {
  const lista = colores.map(color => 
    <li 
      key={color.id}
      style={{ color: color.id === 0 ? 'red' : 'pink'}}
      className="lista">
        {color.nombre}
    </li>
    )
  return (
    <ul>
      {lista}
    </ul>
  );
}

function BtnGlobal({contador, manejadorClick}) {  
  return (
    <button 
      className="mi_primer_btn"
      onClick={manejadorClick}
    >
      clickeado {contador} veces
    </button>
  );
}

function BtnIndividual() {
  const [contador, setContador] = useState(0);
  function manejadorClick () {
    console.log('click en btn individual');
    setContador(contador + 1);
  }
  return (
    <button
      className="mi_primer_btn"
      onClick={manejadorClick}
    >
      clickeado {contador} veces  
    </button>
  )
}

function MyApp() {
  const [contador, setContador] = useState(0);
  const manejoClick = () => {    
    setContador(contador + 1);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Perfil />
        <BtnGlobal contador={contador} manejadorClick={manejoClick}/>
        <BtnIndividual />
        <Mylista />
        <BtnGlobal  contador={contador} manejadorClick={manejoClick}/>
      </header>
    </div>
  );
}



export default MyApp;
