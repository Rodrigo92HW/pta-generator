import React, { useEffect, useMemo, useState } from 'react';
import pokemon from './jsonReader/jsonFolder/pokemon.json';
import ReactSelect from 'react-select';

const PokemonSearch = ({setSearchedPokemon, numCards, updateSearch}) => {
    const [searchCondition, setSearchCondition] = useState("Type");
    const [searchValue, setSearchValue] = useState("");
    const [uniqueOptions, setUniqueOptions] = useState([]);

    //Se encarga de cambiar la condicion de la busqueda
    const handleConditionChange = (e) => {
        setSearchCondition(e.target.value);
    };

    //Desplega los valores que se pueden seleccionar
    const handleValueChange = (value) => {
        setSearchValue(value);
    };

        //Se encarga de filtrar los pokemons a elegir
        const filteredPokemon = useMemo(() => {
            let filtered = pokemon;
            if (searchCondition === "Egg Group") {
                filtered = filtered.filter((p) => p.Biology[0].includes(searchValue));
            } else if (searchCondition === "Diet") {
                filtered = filtered.filter((p) => p.Biology[2].includes(searchValue));
            } else if (searchCondition === "Biome") {
                filtered = filtered.filter((p) => p.Biology[3] && p.Biology[3].includes(searchValue));
            } else {
                filtered = filtered.filter((p) => p[searchCondition].includes(searchValue));
            }
            return filtered;
        }, [searchCondition, searchValue]);

        //Sirve para cambiar Biology a la categoria correcta
        useEffect(() => {
            const optionsIndex = {
            "Egg Group": 0,
            "Diet": 2,
            "Biome": 3
            };
            const index = optionsIndex[searchCondition];
            if (typeof index !== "undefined") {
                setUniqueOptions([...new Set(pokemon.map((p) => p.Biology[index]).flat())]);
            } else {
                setUniqueOptions([...new Set(pokemon.map((p) => p[searchCondition]).flat())]);
            }
        }, [searchCondition]);

            //Filtro que eleva los pokemon que se pueden seleccionar para ser desplegados
            useEffect(() => {
                const numFilteredPokemon = filteredPokemon.length;
                const randomIndexes = new Set();
                while (randomIndexes.size < Math.min(numCards, numFilteredPokemon)) {
                    randomIndexes.add(Math.floor(Math.random() * numFilteredPokemon));
                }
                const randomPokemon = [...randomIndexes].map((i) => filteredPokemon[i]);
                setSearchedPokemon(randomPokemon.map((p) => ({ label: p.Name, value: p.Name })));
            }, [numCards, filteredPokemon, setSearchedPokemon, updateSearch]);

        //Limpia la condicion de busqueda para evitar recursion
        useEffect(() => {
            setSearchedPokemon([]);
            setSearchValue('');
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [searchCondition]);

    return (
    <>
        <select className='searchTerm' value={searchCondition} onChange={handleConditionChange}>
            <option value="Type">Type</option>
            <option value="Size">Size</option>
            <option value="Weight">Weight</option>
            <option value="Skill">Skill</option>
            <option value="Passive">Passive</option>
            <option value="Egg Group">Egg Group</option>
            <option value="Diet">Diet</option>
            <option value="Biome">Biome</option>
        </select>
        <div className='optionsAvailable'>
            <ReactSelect
            className='optionsAvailable'
            options={uniqueOptions.sort((a, b) => a.localeCompare(b)).map((option) => ({label: option, value: option}))}
            value={{label: searchValue, value: searchValue}}
            onChange={(option) => handleValueChange(option.value)}
            placeholder={`Select a ${searchCondition}`}
            />
        </div>
    </>
    );
};

export default PokemonSearch;