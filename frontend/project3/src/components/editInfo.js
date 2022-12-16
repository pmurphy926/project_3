import React, { useState } from 'react'
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
    axios.put(`https://mighty-cliffs-82907.herokuapp.com/${props.clothesParam._id}`,
      {
        type: newType,
        brand: newBrand,
        size: newSize,
        color: newColor,
        imageURL: newImage,
        isClean: true
      }
    ).then(() => {
      props.toggleEdit()
      props.getClothes()
    })
  }

  return (
    <div className='edit-form'>
      <form onSubmit={edit}>
        <input className='edit-form-input' type="text" placeholder={props.clothesParam.type} onChange={handleTypeChange} /><br />
        <input className='edit-form-input' type="text" placeholder={props.clothesParam.brand} onChange={handleBrandChange} /><br />
        <input className='edit-form-input' type="text" placeholder={props.clothesParam.size} onChange={handleSizeChange} /><br />
        <input className='edit-form-input' type="text" placeholder={props.clothesParam.color} onChange={handleColorChange} /><br />
        <input className='edit-form-input' type="text" placeholder={props.clothesParam.imageURL} onChange={handleImageChange} /><br />
        <input className='edit-form-button' type="submit" value="Update Item" />
        {/* <button onClick={hideFormDisplay}>Close Form</button> */}
      </form>
      <button className='edit-form-button' onClick={() => { props.toggleEdit() }}>Cancel</button>
    </div>
  )


}

export default EditInfo