import React, { useEffect, useState } from 'react';
import PokemonCard from './pokemon/PokemonCard';
// import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
// import {db} from '../../firebase';

const PokemonTeam = () => {
  //Numero de Pokemons
  const [numCards, setNumCards] = useState(() => {
    const savedNumCards = JSON.parse(localStorage.getItem('numCards'));
    return savedNumCards || 6;
  });

  //Info del Pokemon
  const [pokemonData, setPokemonData] = useState(() => {
    const savedPokemonData = JSON.parse(localStorage.getItem('pokemonCompleteData'));
    return savedPokemonData || [];
  });
  
  const [prevPokemonData, setPrevPokemonData] = useState(pokemonData);

    //Agrega Cartas
    const addCard = () => {
      setNumCards(numCards + 1);
    };

      //Updatea y guarda la data de las Cartas
      useEffect(() => {
        localStorage.setItem('numCards', JSON.stringify(numCards));
      }, [numCards]);

      //Updatea y guarda la data del Pokemon
      const updatePokemonData = (id, data) => {
        const updatedPokemonData = [...pokemonData];
        updatedPokemonData[id] = {...updatedPokemonData[id], ...data};
        setPokemonData(updatedPokemonData);
      };

      useEffect(() => {
        if (prevPokemonData !== pokemonData) {
          localStorage.setItem('pokemonCompleteData', JSON.stringify(pokemonData));
          setPrevPokemonData(pokemonData);
        }
      }, [pokemonData, prevPokemonData]);

      useEffect(() => {
        const savedPokemonData = JSON.parse(localStorage.getItem('pokemonCompleteData'));
        if (savedPokemonData) {
          setPokemonData(savedPokemonData);
        }
      }, []);

    //Limpia la Data
    function handleClearData() {
      const confirmed = window.confirm("Are you sure you want to clear all data?");
      if (confirmed) {
        localStorage.removeItem('numCards');
        localStorage.removeItem('pokemonCompleteData');
        window.location.reload();
      }
    }

  return (
    <>
    <div className='pokemonTeam'>
      {Array.from({length: numCards}, (_, index) => (
        <PokemonCard 
          key={index} 
          index={index} 
          updatePokemonData={updatePokemonData} 
          pokemonData={pokemonData[index]} 
        />
      ))}
    </div>
    <button onClick={addCard} className='addPokemon'>Add Pokemon</button>
    <div className='clear'><button className='clearTeam' onClick={handleClearData}>Clear Team</button></div>
    </>
  );
};

export default PokemonTeam;