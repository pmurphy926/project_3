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
const [formDisplay, setFormDisplay] = useState(false)
const [showModal, setShowModal] = useState(false)
const [collectionDisplay, setCollectionDisplay] = useState(false)
const [selectValue, setSelectValue] = useState('')



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
  axios.post('http://localhost:3001/wardrobe',
    {
      type:newType,
      brand:newBrand,
      size:newSize, 
      color:newColor,
      isClean:true
    }
  )
}

const handleSelectValue = (event) => {
  setSelectValue(event.target.value)
}

// Display Functions
//____________________
const showFormDisplay = () => {
  setFormDisplay(true)
}

const hideFormDisplay = () => {
  setFormDisplay(false)
}

const showCollection = () => {
  setCollectionDisplay(true)
}

// Sorting Collection 
//____________________
// const filterClothes = (setFilter) =>{
//   axios.get(`http://localhost:3000/pets/${setFilter}`)
//   .then((res)=>{
//     setClothes(res.data)
//     console.log(res.data);
//   })
// }

const getSortOption = () => {
  clothes.map((clothesParam) => {
    return (
      <option>{clothesParam.strAlbum}</option>
    )
  })
}


//Display Data
//________________
useEffect(() => {
  axios.get('https://theaudiodb.com/api/v1/json/2/album.php?i=120871').then((response => {
    setClothes(response.data.album)}))
}, [])


// Browser Display
//________________
  return (
    <main>
    <header>
      <h1>Wardrobe Manager</h1>
    </header>
      <div className='buttons-div'>
        <button onClick={showCollection}>View Collection</button>
        <button>Suggest Outfit</button>
        <button onClick={showFormDisplay}>Add Item</button>
      </div>

      {/* Add Item Form */}
      {formDisplay === true ? 
      <div className='form-modal'>
        <div className='form-modal-box'>
          <h3>Add an Item to Your Wardrobe:</h3>
            <form onSubmit={handleNewItemFormSubmit}>
              <input type="text" placeholder='Type' onChange={handleNewTypeChange}/><br/>
              <input type="text" placeholder='Brand' onChange={handleNewBrandChange}/><br/>
              <input type="text" placeholder='Size' onChange={handleNewSizeChange}/><br/>
              <input type="text" placeholder='Color' onChange={handleNewColorChange}/><br/>
              <input type="text" placeholder='Image' onChange={handleNewImageChange}/><br/>
              {/* Clean: <input type="checkbox" onChange={handleNewReservedForLaundryChange}/><br/> */}
              <input className='sort-button' type="submit" value="Add Item"/>
              <button onClick={hideFormDisplay}>Close Form</button>
            </form>
          </div>
      </div> : null
      }

      {/* View Collection */}
      {collectionDisplay === true ? 
        <div className='collection-heading'>
          <h2>Your Collection</h2>
          <select onChange={handleSelectValue}>
            <option className='sort-dropdown'>
              Choose Clothing Type
            </option>
            {getSortOption()}
          </select>
        </div> : null}
      {collectionDisplay === true ?
      <div className='container'>
        {clothes.map((clothesParam) => {
          return (
            <div className='item-card'>
              <img src={clothesParam.strAlbumThumb}></img>
              <p><span>Type: </span>{clothesParam.strAlbum}</p>
              <p><span>Brand: </span>{clothesParam.strGenre}</p>
              <p><span>Color: </span>{clothesParam.strLabel}</p>
              <p><span>Size: </span>{clothesParam.intYearReleased}</p>
            </div>
          )
        })}
      </div> : null }
    </main>
  );
}

export default App;
