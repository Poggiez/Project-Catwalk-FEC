/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { CardDeck, Card } from 'react-bootstrap';
import apiFunc from './apiFunctions';

const YourOutfit = (props) => {
  const [outfitArray, setOutfitArray] = useState([]);
  const [outfitData, setOutfitData] = useState([]);
  const [{ currentId }] = useState(props);

  useEffect(() => {
    apiFunc.getProductData(outfitArray, setOutfitData);
  }, [outfitArray]);

  const [firstItem, setFirstItem] = useState(0);
  const secondItem = firstItem + 1;
  const thirdItem = firstItem + 2;
  const fourthItem = firstItem + 3;

  let displayArray = [
    outfitData[firstItem],
    outfitData[secondItem],
    outfitData[thirdItem],
    outfitData[fourthItem],
  ];

  if (outfitData.length >= 4) {
    displayArray = displayArray.slice(0, 4);
  } else {
    displayArray = displayArray.slice(0, outfitData.length);
  }

  const leftClick = () => {
    if (firstItem > 0) {
      setFirstItem(firstItem - 1);
    }
  };

  const rightClick = () => {
    if (fourthItem < outfitData.length - 1) setFirstItem(firstItem + 1);
  };

  const addItem = (array, clickId) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === clickId) {
        return;
      }
    }
    console.log(clickId);
    setOutfitArray([...outfitArray, clickId]);
  };

  const deleteItem = (id) => {
    const newArray = outfitArray.filter((item) => item.id !== id);

    setOutfitArray(newArray);
  };

  // myItems.forEach((item) => (
  //     ...
  //     <button onClick={deleteItem(item.id)}>Delete</button>
  // ))
  return (
    <div className="yourOutfit">
      <h1>Your Outfit</h1>

      <CardDeck className="cardDeck">
        {firstItem === 0 ? (<li><span style={{ opacity: 0 }} onClick={leftClick} className="arrow arrow-left" /></li>) : (
          <li><span onClick={leftClick} className="arrow arrow-left" /></li>)}

        <Card>
          <Card.Body className="addOutfit">
            <Card.Title>Add to Outfit</Card.Title>
            <Card.Text>
              <button onClick={() => addItem(outfitArray, currentId)} className="plus-button" />
            </Card.Text>
          </Card.Body>
        </Card>

        <div className="cardGroup">
          {displayArray.map((item, index) => (
            <Card key={index}>
              <span id="item.productInfo.id" onClick={() => deleteItem(item.id)} className="close hairline" />
              <Card.Img className="h-50" variant="top" src={item.styleInfo.results[0].photos[0].thumbnail_url} />
              <Card.Body>
                <Card.Title>{item.productInfo.name}</Card.Title>
                <Card.Text>
                  <p className="card-text">{item.productInfo.category}</p>
                  <p className="card-text">{item.productInfo.default_price}</p>
                  <p className="card-text">☆☆☆☆☆</p>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>

        {fourthItem === outfitData.length - 1 ? (<li><span style={{ opacity: 0 }} onClick={rightClick} className="arrow arrow-right" /></li>) : (<li><span onClick={rightClick} className="arrow arrow-right" /></li>)}

      </CardDeck>
    </div>
  );
};

export default YourOutfit;
