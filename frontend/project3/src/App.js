import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';

const App = () => {

// States
//________________
const [clothes, setClothes] = useState([])
const [newType, setNewType] = useState('')
const [newBrand, setNewBrand] = useState('')
const [newSize, setNewSize] = useState('')
const [newColor, setNewColor] = useState('')
const [newImage, setNewImage] = useState('')


// Form Handlers
//________________
const handleNewTypeChange = (event) => {
  setNewType(event.target.value);
}

const handleNewBrandChange = (event) => {
  setNewBrand(event.target.value);
}

const handleNewSizeChange = (event) => {
  setNewSize(event.target.value);
}

const handleNewColorChange = (event) => {
  setNewColor(event.target.value);
}

const handleNewImageChange = (event) => {
  setNewImage(event.target.value);
}

const handleNewItemFormSubmit = (event) => {
  event.preventDefault();
  axios.post('http://localhost:3000/wardrobe',
    {
      type:newType,
      brand:newBrand,
      size:newSize, 
      color:newColor,
      isClean:true
    }
  ).then(()=>{
    axios.get('http://localhost:3000/wardrobe').then((response) => {
            setClothes(response.data)
        })
    })
    event.target.reset()
}


//Display Data
//________________
useEffect(() => {
  axios.get('https://theaudiodb.com/api/v1/json/2/album.php?i=120871').then((response => {
    setClothes(response.data.album)}))
}, [])
  
  return (
    <main>
    <header>
      <h1>Wardrobe Manager</h1>
    </header>
      <div>
        <button>View Collection</button>
        <button>Suggest Outfit</button>
        <button>Add Item</button>
      </div>
      <div>
      <h3>Add an Item to Your Wardrobe:</h3>
        <form onSubmit={handleNewItemFormSubmit}>
          <input type="text" placeholder='Type' onChange={handleNewTypeChange}/><br/>
          <input type="text" placeholder='Brand' onChange={handleNewBrandChange}/><br/>
          <input type="text" placeholder='Size' onChange={handleNewSizeChange}/><br/>
          <input type="text" placeholder='Color' onChange={handleNewColorChange}/><br/>
          <input type="text" placeholder='Image' onChange={handleNewImageChange}/><br/>
          {/* Reserved for Adoption: <input type="checkbox" onChange={handleNewReservedForAdoptionChange}/><br/> */}
          <input className='sort-button' type="submit" value="Add Pet"/>
        </form>
      </div>
      <div className='container'>
        {clothes.map((clothesParam) => {
          return (
            <div className='item-card'>
              <img src={clothesParam.strAlbumThumb}></img>
              <p><span>Type: </span>{clothesParam.strAlbum}</p>
              <p><span>Brand: </span>{clothesParam.strGenre}</p>
              <p><span>Color: </span>{clothesParam.strLabel}</p>
              <p><span>Size: </span>{clothesParam.strIntYearReleased}</p>
            </div>
          )
        })}
      </div>
    </main>
  );
}

export default App;
