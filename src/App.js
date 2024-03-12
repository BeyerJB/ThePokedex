import React, { useEffect, useState } from 'react';
import './App.css';
import Cry from "./cry";

function App() {

  let [pokemonIndex, setPokemonIndex] = useState(1);
  let [selectedPokemon, setSelectedPokemon] = useState({ name: "Missing No." });
  let [pokemonDescription, setPokemonDescription] = useState({ description: "It's MissingNo!" });
  let [url, setUrl] = useState("https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/1.ogg");

  const increaseClick = () => {
    let index = pokemonIndex + 1;
    setPokemonIndex(index);
  }

  const decreaseClick = () => {
    let index = pokemonIndex - 1;
    setPokemonIndex(index);
  }
  const manualEntry = () => {
    let manualInputNumber = Number(document.getElementById('manualInputNumber').value);
    setPokemonIndex(manualInputNumber);
  }

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`)
      .then(response => response.json())
      .then(pokemonData => {
        setSelectedPokemon(pokemonData);
      })
  }, [pokemonIndex])

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}`)
      .then(response => response.json())
      .then(description => {
        setPokemonDescription(description);
      })
  }, [pokemonIndex])

  useEffect(() => {
    setUrl(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemonIndex}.ogg`)

  }, [pokemonIndex])

  if(selectedPokemon.name == "Missing No." && pokemonDescription.description == "It's MissingNo!"){
    return(
      <h1>LOADING</h1>
    )
  }



  return (
    <div className="App">
      <h1>The Pokedex</h1>
      <div>
        <h2>NO. {pokemonIndex}</h2>
        <h3>{selectedPokemon.name}</h3>
      </div>
      {
        selectedPokemon.sprites == undefined ?
          <img src={"https://miro.medium.com/v2/resize:fit:340/1*Oy3w5Sf30aI8cAObDDHRCA.jpeg"} /> :
          <img id = "pokemonImg" width="300px" src={selectedPokemon.sprites.front_default} />
      }
      {
        pokemonDescription.flavor_text_entries[0].flavor_text == undefined ?
          <p>THIS POKEMON IS NOT DISCOVERED</p> :
          <p id="decriptionBox">{pokemonDescription.flavor_text_entries[0].flavor_text}</p>
      }
      <div>
        <button id="downButton" onClick={decreaseClick}></button>
        <button id="upButton" onClick={increaseClick}></button>
        <input type="text" id="manualInputNumber" placeholder="No. #" maxLength="4" size="6"></input>
        <button onClick={manualEntry}>Go</button>
      </div>

      <Cry url={url} />



    </div>
  );
}
export default App;