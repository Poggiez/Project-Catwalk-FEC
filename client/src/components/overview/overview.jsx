/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageGallery from './imageGalley/ImageGallery';
import Description from './description';
import ProductDetail from './productDetail';

const Overview = (props) => {
  const [expand, setExpand] = useState(false);
  const [{ item }] = useState(props);
  const [{ productId }] = useState(props);
  const [styles, setStyles] = useState([]);
  const [currentStyle, setCurrentStyle] = useState({});
  const [styleId, setStyleId] = useState(0);
  const [currentInd, setCurrentInd] = useState(0);
  const [predisplay, setPredisplay] = useState('button');
  const [nextdisplay, setNextdisplay] = useState('button');
  const [photos, setPhotos] = useState([]);
  const toggleExpand = () => {
    setExpand(!expand);
  };
  const handleGetStyles = () => {
    if (productId) {
      const params = {
        id: productId,
      };
      axios.get('styles', { params })
        .then(({ data }) => {
          const newStyle = data.response.results[0];
          const newStyles = data.response.results;
          setCurrentStyle(newStyle);
          setPhotos(newStyle.photos);
          setStyles(newStyles);
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  useEffect(() => handleGetStyles(), []);

  const handleSelector = ({ target }) => {
    const newCurStyle = styles[target.id];
    setCurrentStyle(newCurStyle);
    setPhotos(newCurStyle.photos);
    setCurrentInd(0);
    setStyleId(Number(target.id));
    setNextdisplay('button');
    setPredisplay('hidden');
  };

  if (expand && styles.length !== 0) {
    return (
      <div id="overview">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="expanded">
                <ImageGallery
                  key={JSON.stringify(photos)}
                  currentInd={currentInd}
                  setNextdisplay={setNextdisplay}
                  nextdisplay={nextdisplay}
                  predisplay={predisplay}
                  setPredisplay={setPredisplay}
                  setCurrentInd={setCurrentInd}
                  toggleExpand={toggleExpand}
                  images={photos}
                  expand={expand}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <Description
            id="descrip"
            item={item}
          />
        </div>
      </div>
    );
  } if (!expand && styles.length !== 0) {
    return (
      <div id="overview">
        <div className="container">
          <div className="row">
            <div className="col-sm-7">
              <div className="no-expanded">
                <ImageGallery
                  key={JSON.stringify(photos)}
                  currentInd={currentInd}
                  setCurrentInd={setCurrentInd}
                  toggleExpand={toggleExpand}
                  images={photos}
                  setNextdisplay={setNextdisplay}
                  nextdisplay={nextdisplay}
                  predisplay={predisplay}
                  setPredisplay={setPredisplay}
                  expand={expand}
                />
              </div>
            </div>
            <div className="col-sm-5" id="detail">
              <ProductDetail
                className="col-5"
                category={item.category}
                name={item.name}
                styles={styles}
                styleId={styleId}
                handleSelector={handleSelector}
                currentstyle={currentStyle}
              />
            </div>
          </div>
        </div>
        <div className="container">
          <Description
            id="descrip"
            item={item}
          />
        </div>
      </div>
    );
  }
  return (
    <p>Loading</p>
  );
};

export default Overview;
