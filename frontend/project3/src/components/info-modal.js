import React from 'react'

const InfoModal = (props) => {
    return (
        <div className='clothes-modal'>
        <div className='clothes-modal-box'>
          <button className='close-modal' onClick={props.hideInfo}>Close</button><br />
          <img className='clothes-modal-img' src={props.clothesParam.imageURL} alt="" />
          <p><span>Type: </span>{props.clothesParam.type}</p>
          <p><span>Brand: </span>{props.clothesParam.brand}</p>
          <p><span>Color: </span>{props.clothesParam.color}</p>
          <p><span>Size: </span>{props.clothesParam.size}</p>
          <button>Edit Info</button>
        </div>
      </div>
    )
}

export default InfoModal