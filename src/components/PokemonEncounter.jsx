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

        //Filtrar pokemon disponibles
        function CategoryCheckbox({ category, isChecked, onToggle }) {
            return (
            <label className="switch">
                <input type="checkbox" checked={isChecked} onChange={onToggle} />
                {category}
                <span className="slider"></span>
            </label>
            );
        }

        const [categories, setCategories] = useState([
            { name: '1st', isChecked: true },
            { name: '2nd', isChecked: true },
            { name: '3rd', isChecked: true },
            { name: 'No Evolution', isChecked: true },
            { name: 'Legendary', isChecked: true },
        ]);

        const handleToggle = (index) => {
            const newCategories = [...categories];
            newCategories[index].isChecked = !newCategories[index].isChecked;
            setCategories(newCategories);
        };

    console.log(categories)

    return (
        <>
        <div className='pokemonSearchBar'>
            <PokemonSearch
                setSearchedPokemon={setSearchedPokemon}
                numCards={numCards}
                updateSearch={updateSearch}
                categories={categories}
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
            <div className='pokemonSearchCategory'>
                <b>Stages↓</b>
                <div className='category-list'>
                {categories.map((category, index) => (
                    <CategoryCheckbox
                    key={index}
                    category={category.name}
                    isChecked={category.isChecked}
                    onToggle={() => handleToggle(index)}
                    />
                ))}
                </div>
            </div>
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