import React, { useState } from 'react'
import Edit from './editInfo'
import axios from 'axios'

const DisplayInfo = (props) => {

  const [edit, setEdit] = useState(false)

  const toggleEdit = () => {
    setEdit(!edit)
  }

  const hideInfo = () => {
    props.setInfoDisplay(false)
  }

const removeClothes = (clothesData) => {
  axios.delete(`https://mighty-cliffs-82907.herokuapp.com/${clothesData._id}`)
  .then(()=> {
    setEdit(false)
    props.setInfoDisplay(false)
    props.getClothes()
  })
}

  return (
    <main>
      {edit ? //if edit is true, then bring up the edit form
        <div className='clothes-modal'>
          <div className='clothes-modal-box'>
            <img className='clothes-modal-img' src={props.clothesParam.imageURL} alt="" />
            <Edit getClothes={props.getClothes} clothesParam={props.clothesParam} toggleEdit={toggleEdit} edit={edit} setEdit={setEdit} clothes={props.clothes} setClothes={props.setClothes} />
          </div>
        </div>
        : //if not, show the modal of the item description
        <div className='clothes-modal'>
          <div className='clothes-modal-box'>
            <button className='close-modal' onClick={hideInfo}>Close</button><br />
            <img className='clothes-modal-img' src={props.clothesParam.imageURL} alt="" />
            <p><span>Type: </span>{props.clothesParam.type}</p>
            <p><span>Brand: </span>{props.clothesParam.brand}</p>
            <p><span>Color: </span>{props.clothesParam.color}</p>
            <p><span>Size: </span>{props.clothesParam.size}</p>
            <button onClick={() => [toggleEdit()]}>Edit Info</button>
            <button onClick={() => [removeClothes(props.clothesParam)]}>Delete Clothing</button>
          </div>
        </div>}
    </main>
  )
}

export default DisplayInfo