import React, {useState} from 'react'

const InfoModal = (props) => {
  const [infoDisplay, setInfoDisplay] = useState(false)
  
  const showInfo = () => {
    setInfoDisplay(true)
  }

  const hideInfo = () => {
    setInfoDisplay(false)
  }

  return (
    <div className='item-card'>
      <img onClick={showInfo} src={props.clothesParam.imageURL}></img><br />
      {infoDisplay ? 
      <div className='clothes-modal'>
        <div className='clothes-modal-box'>
          <button>Edit Info</button>
          <button onClick={() => {props.handleDelete (props.clothesParam)}}>Delete Item</button>
          <button className='close-modal' onClick={hideInfo}>Close</button><br />
          <img className='clothes-modal-img' src={props.clothesParam.imageURL} alt="" />
          <p><span>Type: </span>{props.clothesParam.type}</p>
          <p><span>Brand: </span>{props.clothesParam.brand}</p>
          <p><span>Color: </span>{props.clothesParam.color}</p>
          <p><span>Size: </span>{props.clothesParam.size}</p>
        </div>
      </div> : null}
      
    </div>
  )
}

export default InfoModal