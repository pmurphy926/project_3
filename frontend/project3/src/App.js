import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';
import InfoModal from './components/info-modal';

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
// const [infoDisplay, setInfoDisplay] = useState(false)


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
  axios.post('https://mighty-cliffs-82907.herokuapp.com/',
    {
      type:newType,
      brand:newBrand,
      size:newSize, 
      color:newColor,
      imageURL:newImage,
      isClean:true
    }
  ).then(()=>{
    axios.get('https://mighty-cliffs-82907.herokuapp.com/').then((response) => {
            setClothes(response.data)
        })
    })
    event.target.reset()
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

const toggleCollection = () => {
  setCollectionDisplay(!collectionDisplay)
}

// const hideCollection = () => {
//   setCollectionDisplay(false)
// }

const getClothes = () => {
  axios
      .get('https://mighty-cliffs-82907.herokuapp.com/')
      .then((response => {
        setClothes(response.data)}))
}

//=================================================
//                  SORTING FUNCTIONS
//=================================================
const filterClothes = (setFilter) =>{
  axios.get(`https://mighty-cliffs-82907.herokuapp.com/${setFilter}`)
  .then((res)=>{
    setClothes(res.data)
    console.log(res.data);
  })
}

//=================================================
//                   USE EFFECT
//=================================================
useEffect(() => {
  getClothes()
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
        <button onClick={toggleCollection}>View Collection</button>
        <button>Suggest Outfit</button>
        <button onClick={showFormDisplay}>Add Item</button>
      </div>

      {/* ADD ITEM FORM */}
      {formDisplay ? 
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
      {collectionDisplay ? 
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
          <div className='container'>
        {clothes.map((clothesParam) => {
          return (
            <InfoModal clothesParam={clothesParam} clothes={clothes} setClothes={setClothes} getClothes={getClothes}/>
          )
        })}
      </div> 
        </div> : null}
        

      {/* SUGGESTED OUTFIT */}
      <div>
        
      </div>
    </main>
  );
}

export default App;
