import React, { useEffect, useState } from 'react';
import ReactSelect from 'react-select';
import pokemon from './jsonReader/jsonFolder/pokemon.json';
import typecolors from './jsonReader/jsonFolder/typecolors.json';
import PokemonStats from './jsonReader/PokemonStats';
import PokemonMovements from './jsonReader/PokemonMovements';
import PokemonInfo from './jsonReader/PokemonInfo';
import PokemonImage from './jsonReader/PokemonImage';
import PokemonLegendary from './jsonReader/PokemonLegendary';


const PokemonCard = ({updatePokemonData, index, pokemonData, searchedPokemon}) => {
  //Estados generales que necesito
    //Propios de PokemonCard
      //Nombre
      const [pokemonName, setPokemonName] = useState('');
      //Api que genera data de los Pokemon
      const [pokemonApi, setPokemonApi] = useState('');
    //Para TODOS
      //Input Habilitado o No
      const [inputDisabled, setInputDisabled] = useState(false);
      //Pokemon Seleccionado
      const [pokemonSelected, setPokemonSelected] = useState('');
    //Parte de PokemonStats
      //Estadisticas
      const [stats, setStats] = useState([]);
      //Trackea la Vida Actual
      const [actualHP, setActualHP] = useState(0);
    //Parte de PokemonInfo
      //Holdea la Info Casica
      const [info, setInfo] = useState({});
      //Genero
      const [gender, setGender] = useState(0);
      //Tipo
      const [pokemonType, setPokemonType] = useState([{value: '', label: ''}, {value: '', label: ''}]);
      //Pasivos
      const [passiveInfo, setPassiveInfo] = useState([]);
      //Skills
      const [skillsInfo, setSkillsInfo] = useState([]);
      //Naturaleza
      const [natureSelected, setNatureSelected] = useState('');
      //Item Equipado
      const [itemEquipped, setItemEquipped] = useState('');
      //Extras
      const [extras, setExtras] = useState('');
    //Parte de PokemonImage
      //Imagen
      const [image, setImage] = useState(pokemonApi.sprites);
      //Imagen Cambiada
      const [uploadedImage, setUploadedImage] = useState('');
    //Parte de PokemonMovements
      //Movimientos
      const [moves, setMoves] = useState([]);
      //Establece los tipos que puede tener un movimiento
      const [selectedTypes, setSelectedTypes] = useState([]);
      //Constante que se encarga de trakear el numero de movimientos que el pokemon posee
      const [moveCount, setMoveCount] = useState(3);
    //Parte de Legendary
      //Activos de Legendario
      const [legendaryActive, setLegendaryActive] = useState([]);
      //Pasivos de Legendario
      const [legendaryPassive, setLegendaryPassive] = useState([]);

  //Funciones Internas
    //Mapea los nombres de los Pokemon
    let pokemonNames = pokemon.map((x) => ({
      label: x.Name, 
      value: x.Name
    }))

      //Funcion que cambia el pokemon
      function changePokemon (e) {
        setPokemonSelected(e);
        setDataAlreadySet(false);
      }

        //Funcion que usa Search para seleccionar el Pokemon
        useEffect(() => {
          if(searchedPokemon)
          setPokemonSelected(searchedPokemon[0]);
        }, [searchedPokemon])

    //Fechea la data
    useEffect(() => {
      if (!pokemonSelected) return;
      const lowerCaseName = pokemonSelected.label.toLowerCase();
      const desiredPokemon = pokemon.find(x => x.Name === pokemonSelected.label);
      if (desiredPokemon.RareName) {
          fetch(`https://pokeapi.co/api/v2/pokemon/${desiredPokemon.RareName}`)
            .then(response => response.json())
            .then(data => {
              const pokemonData = {
                dexNumber: parseInt(data.species.url.split('/')[6]),
                sprites: data.sprites.front_default,
                species: desiredPokemon.Name
          };
        setPokemonApi(pokemonData);
      });    
      } else {
      fetch(`https://pokeapi.co/api/v2/pokemon/${lowerCaseName}`)
        .then(response => response.json())
        .then(data => {
          const pokemonData = {
            dexNumber: data.id,
            sprites: data.sprites.front_default,
            species: data.species.name.charAt(0).toUpperCase() + data.species.name.slice(1)
          };
          setPokemonApi(pokemonData);
        })};
    }, [pokemonSelected]);

    //Mapea los datos de la API
    useEffect(() => {
      setImage(pokemonApi.sprites);
    }, [pokemonApi]);

  //Holdea TODA la data del Pokemon
  useEffect(() => {
    updatePokemonData(index, {
      pokemonName, 
      inputDisabled, 
      pokemonSelected,
      stats,
      actualHP,
      info,
      gender,
      pokemonType, 
      passiveInfo,
      skillsInfo,
      natureSelected, 
      itemEquipped,
      extras,
      image,
      moves,
      selectedTypes,
      uploadedImage,
      legendaryActive,
      moveCount
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, pokemonName, inputDisabled, pokemonSelected, stats, actualHP, info, gender, pokemonType, passiveInfo, skillsInfo, natureSelected, itemEquipped, extras, image, moves, selectedTypes, uploadedImage, moveCount, legendaryActive]);

  //Esto aplica toda la data guardado, pero primero establece un switch para no resetear las cosas
  const [dataAlreadySet, setDataAlreadySet] = useState(false);

  useEffect(() => {
    if (pokemonData) {
      setPokemonName(pokemonData.pokemonName || '');
      setInputDisabled(pokemonData.inputDisabled || false);
      setPokemonSelected(pokemonData.pokemonSelected || '');
      setStats(pokemonData.stats || []);
      setActualHP(pokemonData.actualHP || '');
      setInfo(pokemonData.info || '');
      setGender(pokemonData.gender || 0);
      setPokemonType(pokemonData.pokemonType || []);
      setPassiveInfo(pokemonData.passiveInfo || '');
      setSkillsInfo(pokemonData.skillsInfo || '');
      setNatureSelected(pokemonData.natureSelected || '');
      setItemEquipped(pokemonData.itemEquipped || '');
      setExtras(pokemonData.extras || '');
      setImage(pokemonData.image || pokemonApi.sprites);
      setMoves(pokemonData.moves || []);
      setSelectedTypes(pokemonData.selectedTypes || '');
      setMoveCount(pokemonData.moveCount || '');
      setUploadedImage(pokemonData.uploadedImage || '');
      setLegendaryActive(pokemonData.legendaryActive || [])
      setDataAlreadySet(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Establece los colores de los tipos
  const typeColors = typecolors;

  return (
    <>
    {pokemonSelected ? (
      <div className='pokemonCard'
      style={{background: `linear-gradient(to right, ${typeColors[pokemonType[0].label]}, ${typeColors[pokemonType[1].label]})`}}>          
        <div className='pokemonBasic'>
          <div className={'pokemonSelect'}>
            <ReactSelect 
              options={pokemonNames} 
              onChange={changePokemon} 
              placeholder='' 
              components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }} 
              isDisabled={inputDisabled}
            />
          </div>
          <div className='pokemonName'><input type="text" value={pokemonName} 
            onChange={(e) => setPokemonName(e.target.value)} disabled={inputDisabled}/>
            <button className={inputDisabled ? 'lock' : 'unlocked'} onClick={() => setInputDisabled(prevState => !prevState)}></button>
          </div>
          <PokemonImage
            inputDisabled={inputDisabled}
            image={image}
            uploadedImage={uploadedImage} 
            setUploadedImage={setUploadedImage}
            index={index}
          />
          <PokemonStats
            dataAlreadySet={dataAlreadySet}
            pokemonSelected={pokemonSelected}
            inputDisabled={inputDisabled}
            stats={stats} 
            setStats={setStats}
            natureSelected={natureSelected}
            actualHP={actualHP}
            setActualHP={setActualHP}
          />
          </div>
          <PokemonMovements
            dataAlreadySet={dataAlreadySet}
            pokemonSelected={pokemonSelected}
            inputDisabled={inputDisabled}
            stats={stats} 
            pokemonType={pokemonType}
            moves={moves}
            setMoves={setMoves}
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
            moveCount={moveCount}
            setMoveCount={setMoveCount}
            typeColors={typeColors}
          />
          <PokemonInfo
            dataAlreadySet={dataAlreadySet}
            pokemonSelected={pokemonSelected}
            inputDisabled={inputDisabled}
            gender={gender}
            setGender={setGender}
            info={info}
            setInfo={setInfo}
            pokemonType={pokemonType}
            setPokemonType={setPokemonType}
            pokemonApi={pokemonApi}
            skillsInfo={skillsInfo}
            setSkillsInfo={setSkillsInfo}
            passiveInfo={passiveInfo}
            setPassiveInfo={setPassiveInfo}
            itemEquipped={itemEquipped}
            setItemEquipped={setItemEquipped}
            natureSelected={natureSelected}
            setNatureSelected={setNatureSelected}
            extras={extras}
            setExtras={setExtras}
          />
          <PokemonLegendary
            legendaryActive={legendaryActive}
            setLegendaryActive={setLegendaryActive}
            legendaryPassive={legendaryPassive}
            setLegendaryPassive={setLegendaryPassive}
            dataAlreadySet={dataAlreadySet}
            pokemonSelected={pokemonSelected}
            inputDisabled={inputDisabled}
            stats={stats} 
            pokemonType={pokemonType}
            moves={moves}
            setMoves={setMoves}
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
            moveCount={moveCount}
            typeColors={typeColors}
          />
      </div>
    ) : (
    <div className={'pokemonPreSelect'}>
      <ReactSelect options={pokemonNames} onChange={changePokemon} value='' placeholder='Select Pokemon...'/>
    </div>
    )}
    </>
  )
}

export default PokemonCard;