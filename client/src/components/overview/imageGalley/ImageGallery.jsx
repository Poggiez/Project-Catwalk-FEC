/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import pics from '../../../../../overviewdata.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpand } from '@fortawesome/free-solid-svg-icons'
import Carouse from './carouse.jsx';
import ThumbnailPic from './thubnailpic.jsx';


const ImageGallery = (props) => {
  const [className, setClassname] = useState('')
  useEffect(() => { handlechange() })

  const handlechange = () => {
    if (props.currentInd === props.images.length - 1) {
      props.setNextdisplay('hidden')
    }
    if (props.currentInd === 0) {
      props.setPredisplay('hidden')
    }
    if (props.currentInd < 6 && !props.expand) {
      document.getElementById('thumbnail').scrollTop -= 150;
    }
  }

  const goToNext = () => {
    if (props.currentInd < props.images.length - 1) {
      props.setCurrentInd(() => props.currentInd + 1)
      props.setPredisplay('button')
      if (props.currentInd === props.images.length - 1) {
        props.setNextdisplay('hidden')
      }
    }
    if (props.currentInd >= 5 && !props.expand) {
      document.getElementById('thumbnail').scrollTop += 150;
    }
  }

  const goToPrevious = () => {
    if (props.currentInd > 0) {
      props.setCurrentInd(() => props.currentInd - 1);
      props.setNextdisplay('button')
      if (props.currentInd === 0) {
        props.setPredisplay('hidden')
      }
    }
  }
  const handleClick = ({ target }) => {
    props.setCurrentInd(Number(target.id))
    if (currentInd > 2) {
      document.getElementById('thumbnail').scrollTop -= 200;
    }
    if (currentInd <= 5) {
      document.getElementById('thumbnail').scrollTop -= 150;
    }

    if (Number(target.id) < props.images.length - 1) {
      props.setNextdisplay('button')
    } else {
      props.setNextdisplay('hidden')
    }

    if (Number(target.id) > 0) {
      props.setPredisplay('button')
    } else {
      props.setPredisplay('hidden')
    }
  }

  return (
    <div id='img' className='container'>
      <Carouse
        data={props.images}
        currentInd={props.currentInd}
        goToNext={goToNext}
        goToPrevious={goToPrevious}
        predisplay={props.predisplay}
        nextdisplay={props.nextdisplay}
      />
      <ThumbnailPic
        currentInd={props.currentInd}
        data={props.images}
        handleClick={handleClick}
        expand={props.expand}
      />
      <button
        className='expand'
        onClick={props.toggleExpand}>
        <FontAwesomeIcon icon={faExpand} />
      </button>
    </div>
  )

}

export default ImageGallery;