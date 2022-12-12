import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';

const App = () => {

//=================================================
//                   STATES
//=================================================
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
const [filter, setFilter] = useState([])
const [infoDisplay, setInfoDisplay] = useState(false)


//=================================================
//                FORM HANDLERS
//=================================================
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

// const handleSelectValue = (event) => {
//   setSelectValue(event.target.value)
// }

//=================================================
//               DISPLAY FUNCTIONS
//=================================================
const showFormDisplay = () => {
  setFormDisplay(true)
}

const hideFormDisplay = () => {
  setFormDisplay(false)
}

const showCollection = () => {
  setCollectionDisplay(true)
}

const hideCollection = () => {
  setCollectionDisplay(false)
}

const showInfo = () => {
  setInfoDisplay(true)
  // hideCollection()
}

const hideInfo = () => {
  setInfoDisplay(false)
}

//=================================================
//                  SORTING FUNCTIONS
//=================================================
const filterClothes = (setFilter) =>{
  axios.get(`http://localhost:3000/${setFilter}`)
  .then((res)=>{
    setClothes(res.data)
    console.log(res.data);
  })
}

//=================================================
//                   USE EFFECT
//=================================================
useEffect(() => {
  axios.get('https://mighty-cliffs-82907.herokuapp.com/').then((response => {
    setClothes(response.data)}))
}, [])


//=================================================
//               BROWSER CONTENT
//=================================================
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

      {/* ADD ITEM FORM */}
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

      {/* VIEW ENTIRE COLLECTION */}
      {collectionDisplay === true ? 
        <div className='collection-heading'>
          <h2>Your Collection</h2>
          <select>
            <option className='sort-dropdown'>
              Choose Clothing Type
            </option>
            {clothes.map((clothesParam) => {
              return (
                <option onClick={() => {filterClothes (clothes)}}>{clothesParam.type}</option>
                )
              })}
          </select>
        </div> : null}
      {collectionDisplay === true ?
      <div className='container'>
        {clothes.map((clothesParam) => {
          return (
            <div className='item-card'>
              <img onClick={showInfo} src={clothesParam.imageURL}></img><br />
              {infoDisplay === true ?
                  <div className='item-info'>
                  <p><span>Type: </span>{clothesParam.type}</p>
                  <p><span>Brand: </span>{clothesParam.brand}</p>
                  <p><span>Color: </span>{clothesParam.color}</p>
                  <p><span>Size: </span>{clothesParam.size}</p><br />
                  <button>Edit Info</button>
                  <button onClick={hideInfo}>Hide Info</button>
                  </div>: null}
            </div>
          )
        })}
      </div> : null }

      {/* SINGLE ITEM INFO */}
      {/* <div>
      {infoDisplay === true ?
                  <div className='item-info'>
                  <p><span>Type: </span>{req.body.strAlbum}</p>
                  <p><span>Brand: </span>{clothesParam.strGenre}</p>
                  <p><span>Color: </span>{clothesParam.strLabel}</p>
                  <p><span>Size: </span>{clothesParam.intYearReleased}</p><br />
                  <button>Edit Info</button>
                  <button onClick={hideInfo}>Hide Info</button>
                  </div>: null}
      </div>
       */}
      {/* SUGGESTED OUTFIT */}
      <div>
        
      </div>
    </main>
  );
}

export default App;
