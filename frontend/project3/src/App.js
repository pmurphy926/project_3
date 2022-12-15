import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';
import InfoModal from './components/info-modal';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

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

const [shirt, setShirt] = useState([])
const [pants, setPants] = useState([])
const [outerwear, setOuterwear] = useState([])
const [hats, setHats] = useState([])
const [footwear, setFootwear] = useState([])
const [accessories, setAccessories] = useState([])


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

const getShirts = () => {
  axios
      .get('https://mighty-cliffs-82907.herokuapp.com/filter/shirt')
      .then((response => {
        setShirt(response.data)}))
}

const getPants = () => {
  axios
      .get('https://mighty-cliffs-82907.herokuapp.com/filter/pants')
      .then((response => {
        setPants(response.data)}))
}
const getOuterwear = () => {
  axios
      .get('https://mighty-cliffs-82907.herokuapp.com/filter/outerwear')
      .then((response => {
        setOuterwear(response.data)}))
}

const getHats = () => {
  axios
      .get('https://mighty-cliffs-82907.herokuapp.com/filter/hats')
      .then((response => {
        setHats(response.data)}))
}
const getFootwear = () => {
  axios
      .get('https://mighty-cliffs-82907.herokuapp.com/filter/footwear')
      .then((response => {
        setFootwear(response.data)}))
}
const getAccessories = () => {
  axios
      .get('https://mighty-cliffs-82907.herokuapp.com/filter/accessories')
      .then((response => {
        setAccessories(response.data)}))
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
    console.log(res.data);
  })
}

//=================================================
//                   USE EFFECT
//=================================================
useEffect(() => {
  getClothes()
  filterOptions()
  getShirts()
  getPants()
  getOuterwear()
  getHats()
  getFootwear()
  getAccessories()
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

          {filter.map((type) => {
                return (
                  <button className='sort-button' onClick={() => {filterClothes(type)}}>{type}</button>
                  )
                })}




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
        </div> : 
        <div>
        <Carousel showThumbs={false} width='80%' autoPlay={true} infiniteLoop={true}  transitionTime={2500} showStatus={false} showIndicators={false}>
        {shirt.map((clothesParam) => {
      return (
          <img src={clothesParam.imageURL} height="500vw" />
          )
    })}
        </Carousel>
        <Carousel showThumbs={false} width='80%' autoPlay={true} infiniteLoop={true}  transitionTime={2500} showStatus={false} showIndicators={false}>
        {pants.map((clothesParam) => {
      return (
          <img src={clothesParam.imageURL} height="500vw" />
          )
    })}
        </Carousel>
        <Carousel showThumbs={false} width='80%' autoPlay={true} infiniteLoop={true}  transitionTime={2500} showStatus={false} showIndicators={false}>
        {outerwear.map((clothesParam) => {
      return (
          <img src={clothesParam.imageURL} height="500vw" />
          )
    })}
        </Carousel>
        <Carousel showThumbs={false} width='80%' autoPlay={true} infiniteLoop={true}  transitionTime={2500} showStatus={false} showIndicators={false}>
        {hats.map((clothesParam) => {
      return (
          <img src={clothesParam.imageURL} height="500vw" />
          )
    })}
        </Carousel>
        <Carousel showThumbs={false} width='80%' autoPlay={true} infiniteLoop={true}  transitionTime={2500} showStatus={false} showIndicators={false}>
        {footwear.map((clothesParam) => {
      return (
          <img src={clothesParam.imageURL} height="500vw" />
          )
    })}
        </Carousel>
        <Carousel showThumbs={false} width='80%' autoPlay={true} infiniteLoop={true}  transitionTime={2500} showStatus={false} showIndicators={false}>
        {accessories.map((clothesParam) => {
      return (
          <img src={clothesParam.imageURL} height="500vw" />
          )
    })}
        </Carousel>
        </div>
        }
        

        {/* carousel */}
       
            {/* <Carousel showThumbs={false} width='80%' autoPlay={true} infiniteLoop={true}  transitionTime={2500} showStatus={false} showIndicators={false}>
            {clothes.map((clothesParam) => {
          return (
              <img src={clothesParam.imageURL} height="500vw" />
              )
        })}
            </Carousel> */}
        

      {/* SUGGESTED OUTFIT */}
      <div>
        
      </div>
    </main>
  );
}

export default App;