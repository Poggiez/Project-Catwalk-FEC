/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import Stars from './stars';

function ReviewTile(props) {
  // refactor to use ref so it only rerenders on stars change --> memoize the roundStars

  function roundStars(star) {
    return Math.floor(star * 4);
  }

  // eslint-disable-next-line consistent-return
  function isVerified(verified) {
    if (verified) {
      return <i className="bi bi-check-circle-fill" />;
    }
  }

  const [{ stars }] = useState(props);
  const [starsRounded] = useState(() => roundStars(stars));
  const [{ title }] = useState(props);
  const [{ body }] = useState(props);
  const [positiveReviews, setPositiveReviews] = useState(0);
  const [reportCount, setReportCount] = useState(0);
  const [name] = useState('Tobias Fischer');
  const [date] = useState('January 29, 2019');
  const [verified] = useState(true);

  return (
    <div className="review-tile">
      <Card style={{ color: '#525252' }}>
        <div id="star" className="">
          <Stars stop={20} step={4} fractions={4} initialRating={starsRounded} readOnly="true" quiet="true" />
        </div>
        <div id="user-container" className="d-inline-flex justify-content-end">
          {isVerified(verified)}
          <div id="user-container-item" className="ml-3">{name}</div>
          ,
          <div id="user-container-item" className="ml-3">{date}</div>
        </div>
        <div className="mt-3" id="review-text-container">
          <Card.Title>
            { title }
            <strong>This is the title of my review</strong>
          </Card.Title>
          <Card.Text style={{ color: '#949494' }}>
            { body }
            d this is the text of my review. and this is the texthe ndthis is the text of my review.
          </Card.Text>
        </div>
        <div style={{ color: '#949494' }} className="d-inline-flex">
          <div className="mt-2">Helpful?</div>
          <a style={{ color: '#949494' }} id="helpful-yes" className="ml-auto p-2" onClick={() => setPositiveReviews(positiveReviews + 1)} aria-hidden="true"><u>Yes</u></a>
          <div className="mt-2">
            (
            {positiveReviews}
            )
          </div>
          <div className="ml-auto p-2">|</div>
          <a style={{ color: '#949494' }} id="helpful-yes" className="ml-auto p-2" onClick={() => setReportCount(reportCount + 1)} aria-hidden="true"><u>Report</u></a>
        </div>
      </Card>
    </div>
  );
}

export default ReviewTile;
