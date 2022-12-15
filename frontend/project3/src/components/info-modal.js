import React, {useState} from 'react'
import DisplayInfo from './displayInfo'

const InfoModal = (props) => {
  const [infoDisplay, setInfoDisplay] = useState(false)
  
  const showInfo = () => {
    setInfoDisplay(true)
  }

  // const hideInfo = () => {
  //   setInfoDisplay(false)
  // }

  return (
    <div className='item-card'>
      <img onClick={showInfo} src={props.clothesParam.imageURL}></img><br />

      {infoDisplay ? //infoDisplay is truthy, so this should be saying if infoDisplay is true
      <div>
        <DisplayInfo handleDelete={props.handleDelete} getClothes={props.getClothes} clothesParam={props.clothesParam} infoDisplay={infoDisplay} setInfoDisplay={setInfoDisplay} clothes={props.clothes} setClothes={props.setClothes}/>
      </div> : null}

      
    </div>
  )
}

export default InfoModal