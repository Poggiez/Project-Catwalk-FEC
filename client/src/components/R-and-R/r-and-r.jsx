/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'react-widgets/styles.css';
import DropdownList from 'react-widgets/DropdownList';
import ReviewsList from './components/review-list/reviews-list';
import OverallRating from './components/breakdown/overall-rating';
import ReviewSpread from './components/breakdown/review-spread';

const Review = (props) => {
  const [count, setCount] = useState(5);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('relevant');
  const [{ productId }] = useState(props);
  const [reviews, setReviews] = useState([]);
  const [product, setProduct] = useState('');
  const [ratings, setRatings] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  const [percentRecommend, setPercentRecommend] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const mounted = useRef(true);

  const handleRecommendation = () => {
    let recommend = 0;
    reviews.forEach((review) => {
      if (review.recommend) recommend += 1;
    });
    setPercentRecommend((recommend / reviews.length) * 100);
  };
  const getReviews = () => {
    const params = {
      page,
      count,
      sort,
      product_id: productId,
    };
    axios.get('reviews', { params })
      .then(({ data }) => {
        setCount(data.response.count);
        setReviews([...data.response.results]);
      })
      .catch((err) => {
        if (mounted.current) {
          throw err;
        }
      });
  };

  const validate = () => {
    if (reviews.length > 0) {
      return (
        <ReviewsList
          key={JSON.stringify(reviews)}
          reviews={reviews}
          product={product}
          productId={productId}
        />
      );
    }
    return <></>;
  };

  const compileRatings = () => {
    const nextRatings = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
    let nextTotal = 0;
    reviews.forEach((item) => {
      nextRatings[item.rating] += 1;
      nextTotal += item.rating;
    });
    setRatings({
      ...ratings,
      ...nextRatings,
    });
    setTotalRatings(nextTotal);
  };

  useEffect(() => {
    getReviews();
    return () => { mounted.current = false; };
  }, [sort]);

  useEffect(() => {
    if (reviews.length > 0) {
      compileRatings();
      handleRecommendation();
    }
  }, [reviews]);

  return (
    <div>
      <p>RATINGS & REVIEWS</p>
      <div className="d-inline-flex justify-content-end">
        <div style={{ marginLeft: '20px' }}>
          <div style={{ margin: '5px auto' }}>
            <OverallRating
              key={totalRatings}
              rating={Math.floor((totalRatings / reviews.length) * 4)}
            />
          </div>
          <div style={{ width: '350px' }}>
            <ReviewSpread
              key={JSON.stringify(ratings)}
              ratingBreakdown={ratings}
              recommendation={percentRecommend}
            />
          </div>
        </div>
        <div style={{
          marginLeft: '50px',
          width: '70%',
          marginTop: '20px',
        }}
        >
          <div
            id="review-sort"
            style={{
              display: 'flex',
            }}
          >
            <strong
              style={{
                marginTop: '5px',
                marginLeft: '5px',
              }}
            >
              {reviews.length}
              {' '}
              reviews, sorted by
            </strong>
            <div
              id="dropdown-list"
              style={{
                marginLeft: '5px',
                marginBottom: '10px',
              }}
            >
              <DropdownList
                defaultValue="Relevant"
                data={['Helpful', 'Newest', 'Relevant']}
                onChange={(val) => setSort(val.toLowerCase())}
              />
            </div>
          </div>
          <div id="reviews-list">
            {validate()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
