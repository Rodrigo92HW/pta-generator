import React, { useEffect } from 'react';
import pokemon from './jsonFolder/pokemon.json';
import movements from './jsonFolder/movements.json';
import types from './jsonFolder/types.json';
import legendaryP from './jsonFolder/legendaryP.json';
import ReactSelect from 'react-select';

const PokemonLegendary = ({dataAlreadySet, pokemonSelected, inputDisabled, stats, pokemonType, legendaryActive, setLegendaryActive, legendaryPassive, setLegendaryPassive, selectedTypes, setSelectedTypes, moveCount, typeColors}) => {

    //Mapea los datos del legendario
    useEffect(() => {
      const selectedPokemon = pokemon.find(x => x.Name === pokemonSelected.value);
      if (selectedPokemon && !dataAlreadySet) {
        if (selectedPokemon.LegendaryPassives) {
          const legendaryData = selectedPokemon.LegendaryPassives.map(passive => {
            const data = legendaryP.find(x => x.Name === passive);
            return data;
          });
          setLegendaryPassive(legendaryData);
        }
        if (selectedPokemon.LegendaryActives) {
          console.log('selectedPokemon.LegendaryActives:', selectedPokemon.LegendaryActives);

          const legendaryData = selectedPokemon.LegendaryActives.map(moveName => getMoveData(moveName))
          console.log('selectedPokemon.LegendaryActives:', selectedPokemon.LegendaryActives);

          setLegendaryActive(legendaryData);
        }
      }
      // eslint-disable-next-line
    }, [dataAlreadySet, pokemonSelected]);

    //Mapea los movimientos, da la data de ellos y la asigna
    function getMoveData(moveName) {
      const selectedMove = movements.find(x => x.Name === moveName);
      console.log('move data:', selectedMove);
      return selectedMove ? {
        Name: selectedMove.Name,
        Type: selectedMove.Type,
        StatAdded: selectedMove.StatAdded,
        Range: selectedMove.Range,
        RangeNumber: selectedMove.RangeNumber,
        RangeArea: selectedMove.RangeArea ? selectedMove.RangeArea[0] : null,
        RangeAreaNumber: selectedMove.RangeArea ? selectedMove.RangeArea[1] : null,
        Frequency: selectedMove.Frequency,
        Damage: selectedMove.Damage,
        Effect: selectedMove.Effect
      } : {};
    }

    //Provee las opciones de tipo
    const typeOptions = types.map(type => ({value: type, label: type}));

      //Funcion que se encarga de cambiar los tipos
      function changeType(index, selectedOption) {
        setSelectedTypes(prevSelectedTypes => {
          const newSelectedTypes = [...prevSelectedTypes];
          newSelectedTypes[index] = selectedOption.value;
          return newSelectedTypes;
        });
      }

  //Aplica STAB
  const STAB = (index) => pokemonType.map(type => type.value).includes(selectedTypes[index]) ? 4 : 0;

return (
  <>{legendaryActive.length > 0 || legendaryPassive.length > 0 ? (
    <div className='pokemonLegendary'>
      <h1>Legendary</h1>
      <div className='legendaryPassive'>
        {legendaryPassive.length > 0 ? (
          legendaryPassive.map((legendaryPassive, index) => (
            <div key={index} className='move Passive'>
              {legendaryPassive && (
                <>
                  <div className='name'>{legendaryPassive.Name}</div>
                  <div className='effect'>{legendaryPassive.Effect}</div>
                </>
              )}
            </div>
          ))
        ) : (null)}
        </div>
      <div className='legendaryActive'>
      {legendaryActive.length > 0 ? (
      <div className='pokemonLegendaryDisplay'>
        {legendaryActive.slice(0, moveCount).map((move, index) => (
          <div key={index} className={`move ${selectedTypes[index]}`} style={{background: `linear-gradient(to left, ${typeColors[selectedTypes[index]]}, #F7F7F7)`}}>
            <div className='moveName'>{move.Name}</div>
            <div className='moveType'>
              <ReactSelect
                className='select MoveType' 
                value={typeOptions.find(option => option.value === selectedTypes[index])}
                options={typeOptions} 
                onChange={selectedOption => changeType(index, selectedOption)}
                isDisabled={inputDisabled}
              />
            </div>
            <div className='moveFrequency'>{move.Frequency}</div>
          <div className='moveRange'>
            {move.RangeNumber ? (
              <>
                {move.Range} {move.RangeNumber} ft.
              </>
            ) : null}
            {move.RangeArea ? (
            <div className='moveRangeArea'>{move.RangeArea} ({move.RangeAreaNumber} ft.)</div>
            ) : null}
          </div>
          <div className='moveAccuracy'>1d20+{stats[move.StatAdded]}</div>
          {move.Damage ? (
          <div className='moveDamage'>{move.Damage}+{stats[move.StatAdded] + STAB(index)}</div>
          ) : null}
          {move.Effect ? (
            <div className='moveEffect'>{move.Effect}</div>
            ) : null}
          </div>
        ))}
      </div>
      ) : null}
      </div>
    </div>
  ): null}
  </>
)}

export default PokemonLegendary;