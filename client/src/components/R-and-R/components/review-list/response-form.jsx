import React, { useState } from 'react';
import {
  Modal,
} from 'react-bootstrap';
import Rating from 'react-rating';
import ReviewForm from './review-form';

const ResponseForm = (props) => {
  const [rating, setRating] = useState(20);
  const [{ product }] = useState(props);
  const [{ productId }] = useState(props);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div id="responseForm">
      <button
        type="button"
        onClick={handleShow}
        id="review-button"
      >
        ADD A REVIEW +
      </button>
      <div id="review-form">
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header>
            <Modal.Title>
              Write your review
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="show-grid">
            <h5>
              About the
              {` ${product}`}
            </h5>
            <div style={{ marginTop: '20px' }}>
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
                onClick={(e) => setRating(e)}
              />
            </div>
            <ReviewForm productId={productId} handleClose={handleClose} />
          </Modal.Body>
        </Modal>
      </div>
    </div>

  );
};

export default ResponseForm;
