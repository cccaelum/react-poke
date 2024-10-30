import React, { useState, useEffect } from 'react';
import Pokeform from './components/form';
import './App.css';

function App () {
  return (
    <>
    <div className="App">
    <h1>Buscar Pokémon</h1>
    <Pokeform />
    </div>
    </>
  )
};

export default App;
