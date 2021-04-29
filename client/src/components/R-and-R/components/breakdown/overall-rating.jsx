import React, { useState } from 'react';

import Rating from 'react-rating';

const OverallRating = (props) => {
  const [{ rating }] = useState(props);
  return (
    <div className="d-inline-flex justify-content-end">
      <div id="overall-rating-average">
        <strong style={{
          fontSize: '60px',
          marginRight: '15px',
        }}
        >
          {rating / 4}
        </strong>
      </div>
      <div
        style={{ marginTop: '20px' }}
        id="overall-rating-star"
      >
        <Rating
          start={0}
          stop={20}
          step={4}
          fractions={4}
          initialRating={rating}
          emptySymbol={(
            <i
              id="star-icon"
              className="bi bi-star"
            />
          )}
          fullSymbol={(
            <i
              id="star-icon"
              className="bi bi-star-fill"
            />
          )}
          readonly="true"
        />
      </div>
    </div>
  );
};

export default OverallRating;
