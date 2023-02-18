import React, { useState } from 'react';
import PokemonCard from './pokemon/PokemonCard';
import PokemonSearch from './pokemon/PokemonSearch';

const GenerateEncounter = () => {
    //Numero de Pokemons
    const [numCards, setNumCards] = useState(0)

    //Pokemons Generados
    const [searchedPokemon, setSearchedPokemon] = useState([''])

    const [updateSearch, setUpdateSearch] = useState(false);

    function updateSearchButton () {
        setUpdateSearch(!updateSearch);
    }

    return (
        <>
        <div className='pokemonSearchBar'>
            <PokemonSearch
                setSearchedPokemon={setSearchedPokemon}
                numCards={numCards}
                updateSearch={updateSearch}
            />
            <select className='cards' name="cards" id="cards" onChange={(e) => setNumCards(e.target.value)}>
                <option defaultChecked value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
            </select>
            <div className='cardsImage'/>
            <div className='pokemonSearchBarReroll'><b>Reroll:</b><button onClick={updateSearchButton}></button></div>
        </div>
        <div className='pokemonEncounter'>
        {Array.from({length: numCards}, (_, index) => {
            const pokemonForCard = searchedPokemon[index % searchedPokemon.length];
            return (
                <PokemonCard 
                    key={index} 
                    index={index}
                    updatePokemonData={() => {}}
                    pokemonData={''}
                    searchedPokemon={[pokemonForCard]}
                />
            );
        })}
        </div>
        </>
    )
}

export default GenerateEncounter;