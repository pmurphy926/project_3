import React, {useState} from 'react'
import axios from 'axios'

const EditInfo = (props) => {
const [newType, setNewType] = useState(props.clothesParam.type)
const [newBrand, setNewBrand] = useState(props.clothesParam.brand)
const [newSize, setNewSize] = useState(props.clothesParam.size)
const [newColor, setNewColor] = useState(props.clothesParam.color)
const [newImage, setNewImage] = useState(props.clothesParam.imageURL)

const handleTypeChange = (event) => {
    setNewType(event.target.value);
  }
  
  const handleBrandChange = (event) => {
    setNewBrand(event.target.value);
  }
  
  const handleSizeChange = (event) => {
    setNewSize(event.target.value);
  }
  
  const handleColorChange = (event) => {
    setNewColor(event.target.value);
  }
  
  const handleImageChange = (event) => {
    setNewImage(event.target.value);
  }

  const edit = (event) => {
    event.preventDefault()
    axios.put(`https://mighty-cliffs-82907.herokuapp.com/'${props.clothesParam._id}`,
    {
      type:newType,
      brand:newBrand,
      size:newSize, 
      color:newColor,
      imageURL:newImage,
      isClean:true
    }
    ).then(()=> {
        props.toggleEdit()
        axios.get('https://mighty-cliffs-82907.herokuapp.com/').then((response) => {
            props.setClothes(response.data)
        })
    })
  }

  return(
    <main>
    <form onSubmit={edit}>
              <input type="text" placeholder={props.clothesParam.type}onChange={handleTypeChange}/><br/>
              <input type="text" placeholder={props.clothesParam.brand} onChange={handleBrandChange}/><br/>
              <input type="text" placeholder={props.clothesParam.size}onChange={handleSizeChange}/><br/>
              <input type="text" placeholder={props.clothesParam.color} onChange={handleColorChange}/><br/>
              <input type="text" placeholder={props.clothesParam.imageURL} onChange={handleImageChange}/><br/>
              {/* Clean: <input type="checkbox" onChange={handleReservedForLaundryChange}/><br/> */}
              <input className='sort-button' type="submit" value="Update Item"/>
              {/* <button onClick={hideFormDisplay}>Close Form</button> */}
            </form>
            <button onClick={()=> {props.toggleEdit()}}>Cancel</button>
            </main>
  )


}

export default EditInfo