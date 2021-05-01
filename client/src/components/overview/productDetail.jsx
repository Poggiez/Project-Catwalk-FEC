import React, { useState } from 'react';
import Star from './productdetail/starRating.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareAltSquare } from '@fortawesome/free-solid-svg-icons'
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import { faPinterestSquare } from '@fortawesome/free-brands-svg-icons';

const ProductDetail = (props) => {
  const [sharebox, setsharebox] = useState(false)

  const handleClick = () => {
    setsharebox(!sharebox)
  }
  return (
    <div id='detail' >
      <div className="rating">
        <Star className="star" />
        <a href="#star-icon">Read all reviews</a>
      </div>
      <h5 className="category">{category}</h5>
      <h2 className="productName">{name}</h2>
      <div className="price">
        {currentstyle.original_price.slice(0, 3)}
      </div>
      <h5 className='category'>{props.category}</h5>
      <h2 className='productName'>{props.name}</h2>
      <div className='price'>${props.currentstyle.original_price.slice(0, 3)}</div>

      <div className='share'>
        <span><FontAwesomeIcon icon={faShareAltSquare} /></span>
        <button
          className='sharelink'
          onClick={handleClick}>SHARE</button>
        <div className={`${sharebox}`}>
          <p>Share with: </p>
          <a href='https://twitter.com/intent/tweet'>
            <span className='shareicon'>
              <FontAwesomeIcon icon={faTwitterSquare} />
            </span>
          </a>
          <a>
            <span className='shareicon'>
              <FontAwesomeIcon icon={faInstagramSquare} />
            </span>
          </a>
          <a>
            <span className='shareicon'>
              <FontAwesomeIcon icon={faPinterestSquare} />
            </span>
          </a>
        </div>
      </div>
      <div className="style">
        <h5>
          style &gt;
          <span>
            {' '}
            {currentstyle.name}
          </span>
        </h5>
        <div className="styleOpt">
          {styles.map((style, index) => {
            let enlargeCSS = '';
            if (index === styleId) {
              enlargeCSS = 'enlarge';
            }
            return (
              <span className={enlargeCSS}>
                <img
                  id={index}
                  key={JSON.stringify(style.photos[0].thumbnail_url)}
                  alt="img"
                  src={style.photos[0].thumbnail_url}
                  onClick={handleSelector}
                />
              </span>
            );
          })}
        </div>
      </div>
      <div className="selectors">
        <select className="sizeSelector">
          <option>SELECT SIZE</option>
          {Object.values(currentstyle.skus).map((item) => (
            <option>{item.size}</option>
          ))}
        </select>
        <select className="quantitySelector">
          <option>1</option>
        </select>
      </div>
      <div className="detailButtons">
        <button type="button" className="addtoCart">ADD TO BAG</button>
        <button type="button" className="save">☆</button>
      </div>

    </div>
  );
};

export default ProductDetail;
