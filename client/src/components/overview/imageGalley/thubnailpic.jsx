import React from 'react';

export default function ThumbnailPic(props) {
  if (props.expand) {
    return (
      <ul id='thumbnail-expand'>
        {
          props.data.map((pic, index) => {
            return (
              <li id='thumbnail-container' key={index}>
              <button className='thumbnailClick' onClick={props.handleClick} id={index}></button>
              </li>
            )
          })
        }
      </ul>
    )
  } else {
    return (
      <ul id='thumbnail'>
        {
          props.data.map((pic, index) => {
            let enlargeStyle = ''
            if (index === props.currentInd) {
              enlargeStyle = 'enlarge'
            }
            return (
              <li id='thumbnail-container' key={index}>
                <img
                  id={index}
                  src={pic.thumbnail_url}
                  onClick={props.handleClick}
                  className={enlargeStyle}
                />
              </li>
            )
          })
        }
      </ul>
    )
  }

}