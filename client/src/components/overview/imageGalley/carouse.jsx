/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const Carouse = (props) => {
  const [{ nextDisplay }] = useState(props);
  const [{ currentInd }] = useState(props);
  const [{ goToNext }] = useState(props);
  const [{ predisplay }] = useState(props);
  const [{ goToPrevious }] = useState(props);
  const [{ data }] = useState(props);

  return (
    <div className="carousel container">
      <TransformWrapper
        defaultScale={1}
        defaultPositionX={200}
        defaultPositionY={100}
      >
        {({
          zoomIn, zoomOut, resetTransform, ...rest
        }) => (
          <>
            <TransformComponent>
              <img
                className="carousel_pic img-fluid"
                src={data[currentInd].url}
              />
            </TransformComponent>
            <div className="tools">
              <button type="button" onClick={zoomIn} className="zoomin">+</button>
              <span>zoom</span>
              <button type="button" onClick={zoomOut} className="zoomout">-</button>
            </div>
          </>
        )}
      </TransformWrapper>
      <button
        type="button"
        className={nextDisplay}
        onClick={goToNext}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
      <button
        type="button"
        id="previous"
        className={predisplay}
        onClick={goToPrevious}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
    </div>
  );
};

export default Carouse;
