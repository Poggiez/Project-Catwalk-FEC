import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Review from './components/R-and-R/r-and-r';
import Overview from './components/overview/overview';
import RelatedItemsAndComparison from './components/related&comp/related_comp';

const App = () => {
  const [productId, setProductId] = useState(16056);
  const [product, setProduct] = useState({});

  const getProduct = () => {
    const params = {
      product_id: productId,
    };
    return axios.get('productById', { params })
      .then(({ data }) => data.response)
      .catch((err) => {
        throw err;
      });
  };
  useEffect(() => {
    getProduct()
      .then((data) => {
        setProduct(data);
      });
  }, []);

  useEffect(() => setProductId(product.id), [product]);
  return (
    <div>
      <div>
        <Overview
          key={productId}
          productId={productId}
          item={product}
        />
      </div>
      <div>
        <RelatedItemsAndComparison
          key={productId}
          productId={productId}
          setProductId={setProductId}
        />
      </div>
      <div>
        <Review
          key={productId}
          productId={productId}
        />
      </div>
    </div>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
