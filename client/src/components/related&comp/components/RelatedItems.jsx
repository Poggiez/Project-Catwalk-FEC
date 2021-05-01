/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { CardDeck, Card } from 'react-bootstrap';
import ComparisonModal from './ComparisonModal';
import apiFunc from './apiFunctions.jsx';

function RelatedItems(props) {
  // const [{ productData }] = useState(props);
  const [{ currentId }] = useState(props);
  const [{ setCurrentId }] = useState(props);
  const [productData, setProductData] = useState([]);

  const [modalShow, setModalShow] = useState(false);
  const [firstItem, setFirstItem] = useState(0);
  const secondItem = firstItem + 1;
  const thirdItem = firstItem + 2;
  const fourthItem = firstItem + 3;
  const fifthItem = firstItem + 4;

  useEffect(() => {
    apiFunc.getRelatedData(currentId, setProductData);
  }, [currentId]);

  let displayArray = [
    productData[firstItem],
    productData[secondItem],
    productData[thirdItem],
    productData[fourthItem],
    productData[fifthItem],
  ];

  if (productData.length >= 5) {
    displayArray = displayArray.slice(0, 5);
  } else {
    displayArray = displayArray.slice(0, productData.length);
  }

  const leftClick = () => {
    if (firstItem > 0) {
      setFirstItem(firstItem - 1);
    }
  };

  const rightClick = () => {
    if (fifthItem <= productData.length) {
      setFirstItem(firstItem + 1);
    }
  };

  return (
    <div className="relatedItems">
      <h1>Related Items</h1>

      <CardDeck className="cardDeck">
        {firstItem === 0 ? (
          <li>
            <span
              style={{ opacity: 0 }}
              className="arrow arrow-left"
            />
          </li>
        )
          : (
            <li>
              <span
                onClick={leftClick}
                className="arrow arrow-left"
              />
            </li>
          )}
        <div className="cardGroup">
          {console.log(displayArray)}
          {displayArray.map((id, index) => (
            <Card key={index}>
              <div className="rating">
                <span onClick={() => setModalShow(true)} className="btn">☆</span>
              </div>
              <Card.Img onClick={() => setCurrentId(id.productInfo.id)} className="h-50" variant="top" src={id.styleInfo.results[0].photos[0].thumbnail_url} />
              <Card.Body>
                <Card.Title>{id.productInfo.name}</Card.Title>
                {console.log(id.productInfo.name)}
                <Card.Text>
                  <p className="card-text">{id.productInfo.category}</p>
                  <p className="card-text">{id.productInfo.default_price}</p>
                  <p className="card-text">☆☆☆☆☆</p>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
        <ComparisonModal show={modalShow} onHide={() => setModalShow(false)} />

        {fifthItem === productData.length - 1 ? (<li><span style={{ opacity: 0 }} className="arrow arrow-right" /></li>) : (
          <li><span onClick={rightClick} className="arrow arrow-right" /></li>
        )}
      </CardDeck>
    </div>
  );
}

export default RelatedItems;
