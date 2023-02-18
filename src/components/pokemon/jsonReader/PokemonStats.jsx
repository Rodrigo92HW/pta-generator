import React, { useEffect } from 'react';
import pokemon from './jsonFolder/pokemon.json';

const PokemonStats = ({dataAlreadySet, pokemonSelected, stats, setStats, natureSelected, inputDisabled, actualHP, setActualHP}) => {

  //Establece las estadisticas del Pokemon seleccionado
    //Mapea las estadisticas del Pokemon
    useEffect(() => {
      const selectedPokemon = pokemon.find(x => x.Name === pokemonSelected.value);
      if (selectedPokemon && !dataAlreadySet) {
        const increaseStat = natureSelected[0];
        const decreaseStat = natureSelected[1];
        const updateStat = (base, stat) => base + (increaseStat === stat ? 1 : decreaseStat === stat ? -1 : 0);
        const calcMod = stat => Math.floor(stat / 2);
        setStats({
          HitPoints: selectedPokemon.HitPoints,
          Attack: updateStat(selectedPokemon.Attack, 'Attack'),
          AttackMod: calcMod(updateStat(selectedPokemon.Attack, 'Attack')),
          Defense: updateStat(selectedPokemon.Defense, 'Defense'),
          DefenseMod: calcMod(updateStat(selectedPokemon.Defense, 'Defense')),
          SAttack: updateStat(selectedPokemon.SAttack, 'SAttack'),
          SAttackMod: calcMod(updateStat(selectedPokemon.SAttack, 'SAttack')),
          SDefense: updateStat(selectedPokemon.SDefense, 'SDefense'),
          SDefenseMod: calcMod(updateStat(selectedPokemon.SDefense, 'SDefense')),
          Speed: updateStat(selectedPokemon.Speed, 'Speed'),
          SpeedMod: calcMod(updateStat(selectedPokemon.Speed, 'Speed'))
        })
      }
    }, [pokemonSelected, setStats, natureSelected]);

  //Incrementa estadistica
  const calcMod = stat => Math.floor(stat / 2);
  const increaseStat = (stat) => {
    setStats({...stats, [stat]: stats[stat]+1, [`${stat}Mod`]: calcMod(stats[stat]+1)});
  };

  //Reduce estadistica
  const decreaseStat = (stat) => {
    setStats({...stats, [stat]: stats[stat]-1, [`${stat}Mod`]: calcMod(stats[stat]-1)});
  };

    //Incrementa Modificador
    const increaseMod = (stat) => {
      setStats({...stats, [stat + 'Mod']: stats[stat + 'Mod'] + 1});
    };

    //Reduce Modificador
    const decreaseMod = (stat) => {
      setStats({...stats, [stat + 'Mod']: stats[stat + 'Mod'] - 1});
    };

    //Incrementa la Vida
    const increaseHP = (value) => {
      setActualHP(actualHP + value);
    };

    //Reduce la Vida
    const decreaseHP = (value) => {
      setActualHP(actualHP + - value);
    };

  return (
    <div className='pokemonStats'>
      <div className='attack'>
        <div className='flat'><button disabled={inputDisabled} className='increase' onClick={() => increaseStat('Attack')}>+</button><label>{stats.Attack}</label><button disabled={inputDisabled} className='decrease' onClick={() => decreaseStat('Attack')}>-</button></div>
        <div className='mod'><button disabled={inputDisabled} className='increase' onClick={() => increaseMod('Attack')}>+</button><label>{stats.AttackMod}</label><button disabled={inputDisabled} className='decrease' onClick={() => decreaseMod('Attack')}>-</button></div>
        <div className='text'>Attack</div>
      </div>
      <div className='hitpoints'>
        <div className='actualHP'><button className='increase' onClick={() => increaseHP(1)}>+</button><input type="text" value={actualHP} onChange={(e) => setActualHP(Number(e.target.value))} /><button className='decrease' onClick={() => decreaseHP(1)}>-</button></div>
        <div className='flat'><button disabled={inputDisabled} className='increase' onClick={() => increaseStat('HitPoints')}>+</button><label>{stats.HitPoints}</label><button disabled={inputDisabled} className='decrease' onClick={() => decreaseStat('HitPoints')}>-</button></div>
        <div className='text'>Hit Points</div>
      </div>
      <div className='defense'>
        <div className='flat'><button disabled={inputDisabled} className='increase' onClick={() => increaseStat('Defense')}>+</button><label>{stats.Defense}</label><button disabled={inputDisabled} className='decrease' onClick={() => decreaseStat('Defense')}>-</button></div>
        <div className='mod'><button disabled={inputDisabled} className='increase' onClick={() => increaseMod('Defense')}>+</button><label>{stats.DefenseMod}</label><button disabled={inputDisabled} className='decrease' onClick={() => decreaseMod('Defense')}>-</button></div>
        <div className='text'>Defense</div>
      </div>
      <div className='sattack'>
        <div className='flat'><button disabled={inputDisabled} className='increase' onClick={() => increaseStat('SAttack')}>+</button><label>{stats.SAttack}</label><button disabled={inputDisabled} className='decrease' onClick={() => decreaseStat('SAttack')}>-</button></div>
        <div className='mod'><button disabled={inputDisabled} className='increase' onClick={() => increaseMod('SAttack')}>+</button><label>{stats.SAttackMod}</label><button disabled={inputDisabled} className='decrease' onClick={() => decreaseMod('SAttack')}>-</button></div>
        <div className='text'>S. Attack</div>
      </div>
      <div className='sdefense'>
        <div className='flat'><button disabled={inputDisabled} className='increase' onClick={() => increaseStat('SDefense')}>+</button><label>{stats.SDefense}</label><button disabled={inputDisabled} className='decrease' onClick={() => decreaseStat('SDefense')}>-</button></div>
        <div className='mod'><button disabled={inputDisabled} className='increase' onClick={() => increaseMod('SDefense')}>+</button><label>{stats.SDefenseMod}</label><button disabled={inputDisabled} className='decrease' onClick={() => decreaseMod('SDefense')}>-</button></div>
        <div className='text'>S. Defense</div>
      </div>
      <div className='speed'>
        <div className='flat'><button disabled={inputDisabled} className='increase' onClick={() => increaseStat('Speed')}>+</button><label>{stats.Speed}</label><button disabled={inputDisabled} className='decrease' onClick={() => decreaseStat('Speed')}>-</button></div>
        <div className='mod'><button disabled={inputDisabled} className='increase' onClick={() => increaseMod('Speed')}>+</button><label>{stats.SpeedMod}</label><button disabled={inputDisabled} className='decrease' onClick={() => decreaseMod('Speed')}>-</button></div>
        <div className='text'>Speed</div>
      </div>
    </div>
  )
}

export default PokemonStats;