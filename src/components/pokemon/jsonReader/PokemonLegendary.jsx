import React, { useEffect } from 'react';
import pokemon from './jsonFolder/pokemon.json';
import movements from './jsonFolder/movements.json';

const PokemonLegendary = ({dataAlreadySet, pokemonSelected, inputDisabled, legendary, setLegendary}) => {

    //Mapea los datos del legendario
    useEffect(() => {
        const selectedPokemon = pokemon.find(x => x.Name === pokemonSelected.value);
        if (selectedPokemon && !dataAlreadySet) {
            if (selectedPokemon.LegendaryPassives) {
            setLegendary(prevState => ({
                ...prevState,
                Passive: selectedPokemon.LegendaryPassives
            }));
            }
            if (selectedPokemon.LegendaryActives) {
            setLegendary(prevState => ({
                ...prevState,
                Active: selectedPokemon.LegendaryActives
            }));
            }
            if (selectedPokemon.Gigantamax) {
            setLegendary(prevState => ({
                ...prevState,
                Gigantamax: selectedPokemon.Gigantamax
            }));
            }
        }
    }, [dataAlreadySet, pokemonSelected, setLegendary]);

      //Mapea los movimientos, da la data de ellos y la asigna
    function getMoveData(moveName) {
    const selectedMove = movements.find(x => x.Name === moveName);
    return selectedMove ? {
        Name: selectedMove.Name,
        Type: selectedMove.Type,
        StatAdded: selectedMove.StatAdded,
        Range: selectedMove.Range,
        RangeNumber: selectedMove.RangeNumber,
        RangeArea: selectedMove.RangeArea[0],
        RangeAreaNumber: selectedMove.RangeArea[1],
        Frequency: selectedMove.Frequency,
        Damage: selectedMove.Damage,
        Effect: selectedMove.Effect
    } : {};
    }
    

    return (
        <div>
            Casa
            {legendary.Passive && <div>{legendary.Passive.join(', ')}</div>}
            {legendary.Active && <div>{legendary.Active.join(', ')}</div>}
            {legendary.Gigantamax && <div>{legendary.Gigantamax}</div>}
        </div>
    );
}

export default PokemonLegendary;