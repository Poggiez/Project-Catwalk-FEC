import React, { useEffect, useState } from 'react';
import ImageGallery from './imageGalley/ImageGallery.jsx';
import Description from './description.jsx';
import ProductDetail from './productDetail.jsx';
import API_KEY from '../../../../config.js';
import axios from 'axios';

export default function Overview(props) {
  const [expand, setExpand] = useState(false);
  const [item, setItem] = useState({});
  const [styles, setStyles] = useState([]);
  const [currentstyle, setCurrentstyle] = useState({});
  const [styleId, setStyleId] = useState(0);
  const [currentInd, setCurrentInd] = useState(0);
  const [predisplay, setPredisplay] = useState('button');
  const [nextdisplay, setNextdisplay] = useState('button');

  const toggleExpand = () => {
    setExpand(!expand)
  }
  const handlegetItems = () => {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products', {
      headers: API_KEY
    })
      .then(res => {
        setItem(res.data[4]);
        handlegetStyles(res.data[4].id)
      })

      .catch(err => {
        console.log(err)
      })
  }
  const handlegetStyles = (id) => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${id}/styles`, {
      headers: API_KEY
    })
      .then(res => {
        setCurrentstyle(res.data.results[0])
        setStyles(res.data.results)
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => handlegetItems(), [])

  const handleSelector = ({ target }) => {

    setCurrentstyle(styles[target.id])
    setCurrentInd(0);
    setStyleId(Number(target.id))

    setNextdisplay('button')
    setPredisplay('hidden')


  }

  if (expand && styles.length !== 0) {
    return (
      <div id='overview' >
        <div className='container'>
          <div className='row'>
            <div className='col-sm-12'>
              <div className='expanded'>
                <ImageGallery
                  currentInd={currentInd}
                  setNextdisplay={setNextdisplay}
                  nextdisplay={nextdisplay}
                  predisplay={predisplay}
                  setPredisplay={setPredisplay}
                  setCurrentInd={setCurrentInd}
                  toggleExpand={toggleExpand}
                  images={currentstyle.photos}
                  expand={expand}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          <Description
            id='descrip'
            item={item} />
        </div>
      </div>
    )

  } else if (!expand && styles.length !== 0) {
    return (
      <div id='overview' >
        <div className='container'>
          <div className='row'>
            <div className='col-sm-7'>
              <div className='no-expanded'>
                <ImageGallery
                  currentInd={currentInd}
                  setCurrentInd={setCurrentInd}
                  toggleExpand={toggleExpand}
                  images={currentstyle.photos}
                  setNextdisplay={setNextdisplay}
                  nextdisplay={nextdisplay}
                  predisplay={predisplay}
                  setPredisplay={setPredisplay}
                />
              </div>
            </div>
            <div className='col-sm-5' id='detail'>
              <ProductDetail
                className='col-5'
                category={item.category}
                name={item.name}
                styles={styles}
                styleId={styleId}
                handleSelector={handleSelector}
                currentstyle={currentstyle}
              />
            </div>
          </div>
        </div>
        <div className='container'>
          <Description
            id='descrip'
            item={item} />
        </div>
      </div>
    )
  } else {
    return (
      <p>Loading</p>
    )
  }


}
