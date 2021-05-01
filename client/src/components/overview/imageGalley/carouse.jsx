/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const Carouse = (props) => {
  return (
    <div className='carousel container'>
      <TransformWrapper
        defaultScale={1}
        defaultPositionX={200}
        defaultPositionY={100}>
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <React.Fragment>
            <TransformComponent>
              <img
                className='carousel_pic img-fluid'
                src={props.data[props.currentInd].url}
              />
            </TransformComponent>
            <div className="tools">
              <button onClick={zoomIn} className='zoomin'>+</button>
              <span>zoom</span>
              <button onClick={zoomOut} className='zoomout'>-</button>
            </div>
          </React.Fragment>
        )}
      </TransformWrapper>
      <button
        className={props.nextdisplay}
        onClick={props.goToNext} >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
      <button
        id='previous'
        className={props.predisplay}
        onClick={props.goToPrevious} >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
    </div>
  )

}

export default Carouse;