import React, { useEffect } from 'react';
import ReactSelect from 'react-select';
import pokemon from './jsonFolder/pokemon.json';
import movements from './jsonFolder/movements.json';
import types from './jsonFolder/types.json';

const PokemonMovements = ({dataAlreadySet, pokemonSelected, inputDisabled, stats, pokemonType, moves, setMoves, selectedTypes, setSelectedTypes, moveCount, setMoveCount, typeColors}) => {

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


      //Se encarga de mapear los tipos de los movimientos
      useEffect(() => {
        const [selectedPokemon] = pokemon.filter(x => x.Name === pokemonSelected.value);
        if(selectedPokemon && !dataAlreadySet) {
          const movesData = selectedPokemon.Move.map(move => getMoveData(move));
          setMoves(movesData);
          setSelectedTypes(movesData.map(move => move.Type));
        }
      }, [pokemonSelected, setSelectedTypes, setMoves, dataAlreadySet]);

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

  //Holdea los movimientos posibles de aprender
  const additionalMoves = movements.map(move => ({value: move.Name, label: move.Name}));

    //Agre los movimientos extra
    const addMove = (selectedOption) => {
      setMoves(prevMoves => [...prevMoves, getMoveData(selectedOption.value)]);
      setMoveCount(prevMoveCount => prevMoveCount + 1);
      setSelectedTypes(prevSelectedTypes => [...prevSelectedTypes, getMoveData(selectedOption.value).Type]);
    };

  //Aplica STAB
  const STAB = (index) => pokemonType.map(type => type.value).includes(selectedTypes[index]) ? 4 : 0;

return (
  <>
  <div className='pokemonMoves'>
    {moves.length > 0 ? (
    <div className='pokemonMovesDisplay'>
      {moves.slice(0, moveCount).map((move, index) => (
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
      <div className='addMove' style={{ width: "200px" }}>
        <ReactSelect options={additionalMoves} onChange={addMove} value={''} isDisabled={inputDisabled}/>
      </div>
  </div>
  </>
  )
}

export default PokemonMovements;