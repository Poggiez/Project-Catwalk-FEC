/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleUp, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

export default function ThumbnailPic(props) {
  const handleScrollup = () => {
    // if (!props.expand) {
    document.getElementById('thumbnail').scrollTop -= 150;
    // console.log('clicked')
    // }
  };

  const handleScrollDown = () => {
    // if (!props.expand) {
    document.getElementById('thumbnail').scrollTop += 150;

    // }
  };

  if (props.expand) {
    return (
      <ul id="thumbnail-expand">
        {
          props.data.map((item, index) => (
            <li id="thumbnail-container" key={index}>
              <button type="button" className="thumbnailClick" onClick={props.handleClick} id={index} />
            </li>
          ))
        }
      </ul>
    );
  }
  return (
    <div>
      <div id="slide-container">
        <div className="thumbnail-tool">
          <button type="button" className="thumbnail-pre" onClick={handleScrollup}>
            <FontAwesomeIcon icon={faChevronCircleUp} />
          </button>
          <button type="button" className="thumbnail-next" onClick={handleScrollDown}>
            <FontAwesomeIcon icon={faChevronCircleDown} />
          </button>
        </div>
        <ul id="thumbnail">
          {
              props.data.map((pic, index) => {
                let enlargeStyle = '';
                if (index === props.currentInd) {
                  enlargeStyle = 'enlarge';
                }
                return (
                  <li id="thumbnail-container" key={index}>
                    <img
                      id={index}
                      src={pic.thumbnail_url}
                      onClick={props.handleClick}
                      className={enlargeStyle}
                    />
                  </li>
                );
              })
            }
        </ul>
      </div>

    </div>
  );
};

/*
  return (
    <ul id="thumbnail">
      {
        data.map((pic, index) => {
          let enlargeStyle = '';
          if (index === currentInd) {
            enlargeStyle = 'enlarge';
          }
          return (
            <li id="thumbnail-container" key={index}>
              <img
                id={index}
                src={pic.thumbnail_url}
                onClick={handleClick}
                className={enlargeStyle}
              />
            </li>
          );
        })
      }
    </ul>
  );
}*/
