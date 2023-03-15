import React from 'react';

const PokemonImage = ({inputDisabled, image, index, uploadedImage, setUploadedImage}) => {

  const handleChange = (e, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.addEventListener('load', (e) => {
      setUploadedImage(prevImage => {
        const updatedImage = [...prevImage];
        updatedImage[index] = e.target.result;
        return updatedImage;
      });
    });
  
    reader.readAsDataURL(file);
  };

  return (
    <div className='pokemonImage'>
      {uploadedImage[index] ? (
        <img className="imagePokemon" src={uploadedImage[index]} alt="" style={{width: '150px', height: '150px'}} />
      ) : (
        <img className="imagePokemon" src={image} alt="" style={{width: '150px', height: '150px'}} />
      )}
      <form>
        <button type="button" onClick={() => document.getElementById(`myFile${index}`).click()} disabled={inputDisabled}></button>
        <input type="file" id={`myFile${index}`} name="filename" onChange={(e) => handleChange(e, index)} className="hidden" />
      </form>
    </div>
  )
}

export default PokemonImage;
