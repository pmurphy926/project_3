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
const [suggestDisplay, setSuggestDisplay] = useState(false)
// const [infoDisplay, setInfoDisplay] = useState(false)
const [randomJacket, setRandomJacket] = useState([])
const [randomJacketIndex, setRandomJacketIndex] = useState(0)
const [randomShirt, setRandomShirt] = useState([])
const [randomShirtIndex, setRandomShirtIndex] = useState(0)
const [randomPants, setRandomPants] = useState([])
const [randomPantsIndex, setRandomPantsIndex] = useState(0)
const [randomShoes, setRandomShoes] = useState([])
const [randomShoesIndex, setRandomShoesIndex] = useState(0)


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
  setSuggestDisplay(false)
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

const filterOptions = () => {
  axios.get('https://mighty-cliffs-82907.herokuapp.com/filter').then((res)=>{
    setFilter(res.data)})
}

//=================================================
//                  SORTING FUNCTIONS
//=================================================
const filterClothes = (setFilter) =>{
  axios.get(`https://mighty-cliffs-82907.herokuapp.com/filter/${setFilter}`)
  .then((res)=>{
    setClothes(res.data)
  })
}

//=================================================
//                  SUGGEST OUTFIT
//=================================================
const pickRandomJacket = () => {
  setRandomJacketIndex(Math.floor(Math.random() * randomJacket.length))
}

const pickRandomShirt = () => {
  setRandomShirtIndex(Math.floor(Math.random() * randomShirt.length))
}

const pickRandomPants = () => {
  setRandomPantsIndex(Math.floor(Math.random() * randomPants.length))
}

const pickRandomShoes = () => {
  setRandomShoesIndex(Math.floor(Math.random() * randomShoes.length))
}


const suggestOutfit = () =>{
  axios.get(`https://mighty-cliffs-82907.herokuapp.com/filter/outerwear`)
  .then((res)=>{
    setRandomJacket(res.data)
  })
  axios.get(`https://mighty-cliffs-82907.herokuapp.com/filter/shirt`)
  .then((res)=>{
    setRandomShirt(res.data)
  })
  axios.get(`https://mighty-cliffs-82907.herokuapp.com/filter/pants`)
  .then((res)=>{
    setRandomPants(res.data)
  })
  axios.get(`https://mighty-cliffs-82907.herokuapp.com/filter/footwear`)
  .then((res)=>{
    setRandomShoes(res.data)
  })
}

const suggestOutfitDisplay = () => {
  setCollectionDisplay(false)
  setSuggestDisplay(true)
  suggestOutfit()
  pickRandomJacket()
  pickRandomShirt()
  pickRandomPants()
  pickRandomShoes()
}


//=================================================
//                   USE EFFECT
//=================================================
useEffect(() => {
  getClothes()
  filterOptions()
  suggestOutfit()
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
        <button onClick={suggestOutfitDisplay}>Suggest Outfit</button>
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

          {/* SORT BUTTONS */}
          {filter.map((type) => {
            return (
              <button className='sort-button' onClick={() => {filterClothes(type)}}>{type}</button>
              )
            })}

          {/* SORT DROPDOWN */}
          {/* <form action="https://mighty-cliffs-82907.herokuapp.com">
            <select>
              <option className='sort-dropdown'>
                Choose Clothing Type
              </option>
              {filter.map((type) => {
                return (
                  <option onChange={() => {filterClothes(type)}}>{type}</option>
                  )
                })}
            </select>
          </form> */}

          <div className='container'>
            {clothes.map((clothesParam) => {
              return (
                <InfoModal clothesParam={clothesParam} clothes={clothes} setClothes={setClothes} getClothes={getClothes}/>
              )
            })}
        </div> 
      </div> : null}
    
      {/* SUGGESTED OUTFIT */}
      {suggestDisplay === true ? 
      <div className='suggestion'>
        <h2>Today You Should Wear...</h2>
          <div>
              <img className='suggest-image' src={randomJacket[randomJacketIndex].imageURL} /><br />
              <img className='suggest-image' src={randomShirt[randomShirtIndex].imageURL} /><br />
              <img className='suggest-image' src={randomPants[randomPantsIndex].imageURL} /><br />
              <img className='suggest-image' src={randomShoes[randomShoesIndex].imageURL} />
          </div>
      </div>
       : null}
    </main>
  );
}

export default App;