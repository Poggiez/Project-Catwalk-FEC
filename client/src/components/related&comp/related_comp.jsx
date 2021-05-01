/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedItems from './components/RelatedItems';
import YourOutfit from './components/YourOutfit';
import API_KEY from '../../../../config';
import 'regenerator-runtime/runtime';

const apiURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';

const RelatedItemsAndComparison = (props) => {
  const [{ productId }] = useState(props);
  const [{ setProductId }] = useState(props);

  return (
    <div className="allComponents">
      <RelatedItems
        currentId={productId}
        setCurrentId={setProductId}
      />
      <YourOutfit
        currentId={productId}
      />
    </div>
  );
};

export default RelatedItemsAndComparison;
