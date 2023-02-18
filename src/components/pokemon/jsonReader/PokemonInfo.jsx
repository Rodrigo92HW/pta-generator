import React, { useEffect } from 'react';
import ReactSelect from 'react-select';
import pokemon from './jsonFolder/pokemon.json';
import types from './jsonFolder/types.json';
import passives from './jsonFolder/passives.json';
import skills from './jsonFolder/skills.json';
import items from './jsonFolder/items.json';
import nature from './jsonFolder/nature.json';

const PokemonInfo = ({dataAlreadySet, pokemonSelected, inputDisabled, gender, setGender, info, setInfo, pokemonType, setPokemonType, pokemonApi, skillsInfo, setSkillsInfo, passiveInfo, setPassiveInfo, itemEquipped, setItemEquipped, natureSelected, setNatureSelected, extras, setExtras}) => {


    //Se encarga de mapear la info obtenida
    useEffect(() => {
      const selectedPokemon = pokemon.find(x => x.Name === pokemonSelected.value);
      if(selectedPokemon && !dataAlreadySet) {
        setInfo({
          Type1: selectedPokemon.Type[0],
          Type2: selectedPokemon.Type[1],
          TypeDisplay: selectedPokemon.Type.join(", "),
          Size: selectedPokemon.Size,
          Weight: selectedPokemon.Weight,
          Passives: selectedPokemon.Passive,
          Skills: selectedPokemon.Skill,
          EggGroup: Array.isArray(selectedPokemon.Biology[0]) ? selectedPokemon.Biology[0].join(", ") : selectedPokemon.Biology[0],
          HatchRate: selectedPokemon.Biology[1],
          Diet: Array.isArray(selectedPokemon.Biology[2]) ? selectedPokemon.Biology[2].join(", ") : selectedPokemon.Biology[2],
          Habitat: Array.isArray(selectedPokemon.Biology[3]) ? selectedPokemon.Biology[3].join(", ") : selectedPokemon.Biology[3]
        });
        setPokemonType([{value: selectedPokemon.Type[0], label: selectedPokemon.Type[0]}, {value: selectedPokemon.Type[1], label: selectedPokemon.Type[1]}]);
      }
    }, [setInfo, pokemonSelected, setPokemonType, dataAlreadySet]);
  
  //Establece los posibles tipos que un Pokemon puede tener
  const typeOptions = types.map(type => ({value: type, label: type}));

    //Cambia o agrega tipos al Pokemon
    function typeChangeOrAdd(selectedOption, index) {
      setPokemonType(prevSelectedTypes => {
        const newTypes = [...prevSelectedTypes];
        newTypes[index].value = selectedOption.value;
        newTypes[index].label = selectedOption.label;
        return newTypes;
      });
    }

    //Se encarga de devolver los textos de los pasivos cuando es necesario
    useEffect(() => {
      if (!info || !info.Passives) return;
      let selectedPassives;
      if (Array.isArray(info.Passives)) {
        selectedPassives = info.Passives.map(passiveName => 
          passives.find(x => x.Name === passiveName)
        );
      }
      setPassiveInfo(selectedPassives.reverse());
    }, [info, setPassiveInfo]);

    //Se encarga de devolver los textos de los skills cuando es necesario
    useEffect(() => {
      if (!info || !info.Skills) return;
      let selectedSkills;
      if (Array.isArray(info.Skills)) {
        selectedSkills = info.Skills.map(skillName => 
          skills.find(x => x.Name === skillName)
        );
      }
      setSkillsInfo(selectedSkills);
    }, [info, setSkillsInfo]);

  //Held items
  const heldItems = items.filter(x => x.Held === 1).map(x => ({
    value: x.Name, 
    label: x.Name,
    name: x.Name,
    text: x.Effect
  }));
  let defaultItem = {value: 'Select...', label: 'Select...'};
  if (itemEquipped[0]) {
    defaultItem = {value: itemEquipped[0], label: itemEquipped[0]};
  };

  const handleItemChange = selectedOption => {
    setItemEquipped([selectedOption.name, selectedOption.text]);
  };

  //Naturalezas
  const natureData = nature.map(x => ({
    value: x.Name,
    label: x.Name,
    name: x.Name,
    increase: x.Increase,
    decrease: x.Decrease,
    likes: x.Likes,
    dislikes: x.Dislikes
  }));
  let defaultNature = {value: 'Select...', label: 'Select...'};
  if (natureSelected[4]) {
    defaultNature = {value: natureSelected[4], label: natureSelected[4]};
  };

  const handleNatureChange = (selectedOption) => {
    setNatureSelected([selectedOption.increase, selectedOption.decrease, selectedOption.likes, selectedOption.dislikes, selectedOption.name]);
  };

  //Valores de Generos
  const genderValues = ['♀', '¿?', '♂'];

  return (
    <div className='pokemonInfo'>
      <div className='pokemonSpecies'><label>{pokemonApi.species}</label><button className={`gender ${genderValues[gender]}`} onClick={() => setGender((gender + 1) % 3)}>{genderValues[gender]}</button></div>
      <div className='pokemonDex'><label>Dex Number:</label> {pokemonApi.dexNumber}</div>
      <div className='type'>
        <ReactSelect options={typeOptions} onChange={(selectedOption) => typeChangeOrAdd(selectedOption, 0)} value={pokemonType[0]} isDisabled={inputDisabled}/>
        <ReactSelect options={typeOptions} onChange={(selectedOption) => typeChangeOrAdd(selectedOption, 1)} value={pokemonType[1]} isDisabled={inputDisabled}/>
      </div>
      <div className='pokemonSkills'><label>Skills</label>
        {skillsInfo.length > 0 ? (skillsInfo.map((skill, index) => (<div key={index} className='pokemonSkillText'>{skill ? `${skill.Name} (${skill.DisplayText})` : ''}<span className='skillText'>{skill ? `${skill.Text}` : ''}</span></div>))) : (null)}
      </div>
      <div className='pokemonPassive'><label>Passive</label>
        {passiveInfo.length > 0 ? (passiveInfo.map((passive, index) => (<div key={index} className='pokemonPassiveText'>{passive ? `${passive.Name} (${passive.Text})` : ''}</div>))) : (null)}
      </div>
        <label>Held Item</label><ReactSelect className='select Item' value={defaultItem} options={heldItems} onChange={handleItemChange} isDisabled={inputDisabled}/>
        {itemEquipped && (
        <div className='heldItemInfo'>
          {itemEquipped[1]}
        </div>
        )}
        <label>Nature</label><ReactSelect className='select Nature' value={defaultNature} options={natureData} onChange={handleNatureChange} isDisabled={inputDisabled}/>
        {natureSelected && (
        <div className='natureInfo'>
          <label>Likes:</label> {natureSelected[2]}, <label>Dislikes:</label> {natureSelected[3]}
        </div>
        )}
      <div className='pokemonSize'><label>Size:</label> {info.Size}</div>
      <div className='pokemonWeight'><label>Weight:</label> {info.Weight}</div>
      <div className='pokemonEgg'><label>Egg Group:</label> {info.EggGroup}</div>
      <div className='pokemonHatch'><label>Hatch Rate:</label> {info.HatchRate}</div>
      <div className='pokemonDiet'><label>Diet:</label> {info.Diet}</div>
      <div className='pokemonHabitat'><label>Habitat:</label> {info.Habitat}</div>
      <div className='pokemonExtras'><h3>Notes</h3><textarea value={extras} onChange={e => setExtras(e.target.value)} /></div>
    </div>
  );
};

export default PokemonInfo;