import React, { useState, useEffect } from 'react'
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


  // const [shirt, setShirt] = useState([])
  // const [pants, setPants] = useState([])
  // const [outerwear, setOuterwear] = useState([])
  // const [hats, setHats] = useState([])
  // const [footwear, setFootwear] = useState([])
  // const [accessories, setAccessories] = useState([])

  const [toggleOn, setToggleOn] = useState(true)


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
        type: newType,
        brand: newBrand,
        size: newSize,
        color: newColor,
        imageURL: newImage,
        isClean: true
      }
    ).then(() => {
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
    setCollectionDisplay(true)
    setToggleOn(false)
    setSuggestDisplay(false)

  }

  // const hideCollection = () => {
  //   setCollectionDisplay(false)
  // }


  const getClothes = () => {
    axios
      .get('https://mighty-cliffs-82907.herokuapp.com/')
      .then((response => {
        setClothes(response.data)
      }))
  }

  // const getShirts = () => {
  //   axios
  //     .get('https://mighty-cliffs-82907.herokuapp.com/filter/shirt')
  //     .then((response => {
  //       setShirt(response.data)
  //     }))
  // }

  // const getPants = () => {
  //   axios
  //     .get('https://mighty-cliffs-82907.herokuapp.com/filter/pants')
  //     .then((response => {
  //       setPants(response.data)
  //     }))
  // }
  // const getOuterwear = () => {
  //   axios
  //     .get('https://mighty-cliffs-82907.herokuapp.com/filter/outerwear')
  //     .then((response => {
  //       setOuterwear(response.data)
  //     }))
  // }

  // const getHats = () => {
  //   axios
  //     .get('https://mighty-cliffs-82907.herokuapp.com/filter/hats')
  //     .then((response => {
  //       setHats(response.data)
  //     }))
  // }
  // const getFootwear = () => {
  //   axios
  //     .get('https://mighty-cliffs-82907.herokuapp.com/filter/footwear')
  //     .then((response => {
  //       setFootwear(response.data)
  //     }))
  // }
  // const getAccessories = () => {
  //   axios
  //     .get('https://mighty-cliffs-82907.herokuapp.com/filter/accessories')
  //     .then((response => {
  //       setAccessories(response.data)
  //     }))
  // }

  const filterOptions = () => {
    axios.get('https://mighty-cliffs-82907.herokuapp.com/filter').then((res) => {
      setFilter(res.data)
    })

  }



  //=================================================
  //                  SORTING FUNCTIONS
  //=================================================
  const filterClothes = (setFilter) => {
    axios.get(`https://mighty-cliffs-82907.herokuapp.com/filter/${setFilter}`)
      .then((res) => {
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


  const suggestOutfit = () => {
    axios.get(`https://mighty-cliffs-82907.herokuapp.com/filter/outerwear`)
      .then((res) => {
        setRandomJacket(res.data)
      })
    axios.get(`https://mighty-cliffs-82907.herokuapp.com/filter/shirt`)
      .then((res) => {
        setRandomShirt(res.data)
      })
    axios.get(`https://mighty-cliffs-82907.herokuapp.com/filter/pants`)
      .then((res) => {
        setRandomPants(res.data)
      })
    axios.get(`https://mighty-cliffs-82907.herokuapp.com/filter/footwear`)
      .then((res) => {
        setRandomShoes(res.data)
      })
  }

  const suggestOutfitDisplay = () => {
    setCollectionDisplay(false)
    setSuggestDisplay(true)
    setToggleOn(false)
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

    // getShirts()
    // getPants()
    // getOuterwear()
    // getHats()
    // getFootwear()
    // getAccessories()


    suggestOutfit()


  }, [])

  //=================================================
  //               BROWSER CONTENT
  //=================================================
  return (
    <main>
      <header>
        <h1>Wardrobe</h1>
      </header>
      <div className='buttons-div'>
        <button className='header-buttons' onClick={toggleCollection}>View Collection</button>
        <button className='header-buttons' onClick={suggestOutfitDisplay}>Suggest Outfit</button>
        <button className='header-buttons' onClick={showFormDisplay}>Add Item</button>
      </div>

      {/* ADD ITEM FORM */}
      {formDisplay ?
        <div className='form-modal'>
          <div className='form-modal-box'>
            <h3>Add an Item to Your Wardrobe:</h3>
            <form onSubmit={handleNewItemFormSubmit}>
              <input type="text" placeholder='Type' onChange={handleNewTypeChange} /><br />
              <input type="text" placeholder='Brand' onChange={handleNewBrandChange} /><br />
              <input type="text" placeholder='Size' onChange={handleNewSizeChange} /><br />
              <input type="text" placeholder='Color' onChange={handleNewColorChange} /><br />
              <input type="text" placeholder='Image URL' onChange={handleNewImageChange} /><br /><br />
              {/* Clean: <input type="checkbox" onChange={handleNewReservedForLaundryChange}/><br/> */}
              <input className='form-button' type="submit" value="Add Item" />
              <button className='form-button' onClick={hideFormDisplay}>Close Form</button>
            </form>
          </div>
        </div> : null
      }

      {/* VIEW ENTIRE COLLECTION */}
      {collectionDisplay ?
        <div className='collection-heading'>
          <h2>Your Collection</h2>

          {/* SORT BUTTONS */}
          <div className='sort-button-div'>
            {filter.map((type) => {
              return (
                <button className='sort-button' onClick={() => { filterClothes(type) }}>{type}</button>
              )
            })}
            <button className='sort-button' onClick={()=> {getClothes()}}>full collection</button>
          </div>
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
                <InfoModal clothesParam={clothesParam} clothes={clothes} setClothes={setClothes} getClothes={getClothes} />
              )
            })}
          </div>
        </div> :
        // <div>
        //   <Carousel showThumbs={false} width='80%' autoPlay={true} infiniteLoop={true} transitionTime={2500} showStatus={false} showIndicators={false}>
        //     {shirt.map((clothesParam) => {
        //       return (
        //         <img src={clothesParam.imageURL} height="500vw" />
        //       )
        //     })}
        //   </Carousel>
        //   <Carousel showThumbs={false} width='80%' autoPlay={true} infiniteLoop={true} transitionTime={2500} showStatus={false} showIndicators={false}>
        //     {pants.map((clothesParam) => {
        //       return (
        //         <img src={clothesParam.imageURL} height="500vw" />
        //       )
        //     })}
        //   </Carousel>
        //   <Carousel showThumbs={false} width='80%' autoPlay={true} infiniteLoop={true} transitionTime={2500} showStatus={false} showIndicators={false}>
        //     {outerwear.map((clothesParam) => {
        //       return (
        //         <img src={clothesParam.imageURL} height="500vw" />
        //       )
        //     })}
        //   </Carousel>
        //   <Carousel showThumbs={false} width='80%' autoPlay={true} infiniteLoop={true} transitionTime={2500} showStatus={false} showIndicators={false}>
        //     {hats.map((clothesParam) => {
        //       return (
        //         <img src={clothesParam.imageURL} height="500vw" />
        //       )
        //     })}
        //   </Carousel>
        //   <Carousel showThumbs={false} width='80%' autoPlay={true} infiniteLoop={true} transitionTime={2500} showStatus={false} showIndicators={false}>
        //     {footwear.map((clothesParam) => {
        //       return (
        //         <img src={clothesParam.imageURL} height="500vw" />
        //       )
        //     })}
        //   </Carousel>
        //   <Carousel showThumbs={false} width='80%' autoPlay={true} infiniteLoop={true} transitionTime={2500} showStatus={false} showIndicators={false}>
        //     {accessories.map((clothesParam) => {
        //       return (
        //         <img src={clothesParam.imageURL} height="500vw" />
        //       )
        //     })}
        //   </Carousel>
        // </div> 
        null
      }

      {toggleOn? 
      <Carousel showThumbs={false} width='100%' autoPlay={true} infiniteLoop={true} transitionTime={2500} showStatus={false} showIndicators={false}>
      {clothes.map((clothesParam) => {
        return (
          <img src={clothesParam.imageURL} />
        )
      })}
    </Carousel> : null}



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