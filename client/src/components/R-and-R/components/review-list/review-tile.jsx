/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import {
  Card,
  Collapse,
  Button,
  Container,
  Image,
  Modal,
} from 'react-bootstrap';
import Rating from 'react-rating';
import axios from 'axios';

const ReviewTile = (props) => {
  const [{ body }] = useState(props); // review card body text
  const [{ date }] = useState(props); // date reviewed
  const [{ helpfulness }] = useState(props); // # of positive reviews (Yes (#))
  const [helpful, setHelpful] = useState(helpfulness);
  const [{ photos }] = useState(props);
  const [{ rating }] = useState(props); // initial rating
  const [ratingsRounded] = useState(() => Math.floor(rating * 4)); // rounding to nearest .25
  const [{ recommend }] = useState(props);
  const [{ response }] = useState(props);
  // eslint-disable-next-line no-unused-vars
  const [{ reviewId }] = useState(props);
  const [{ reviewerName }] = useState(props);
  const [{ summary }] = useState(props); // review card summary
  const [yesClicked, setYesClicked] = useState(false); // if the user clicked Yes -> disable
  const [reportClicked, setReportClicked] = useState(false); // ^^ disable report
  const [purchased] = useState(false);
  const [show, setShow] = useState(false);
  const [thumbnailModal, setThumbnailModal] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleThumbnailClick = (image) => {
    handleShow();
    setThumbnailModal(image);
  };

  const renderThumbnails = () => {
    if (photos.length > 0) {
      const thumbnails = photos.map((image) => (
        <Image
          onClick={() => handleThumbnailClick(image.url)}
          style={{
            width: '100px',
            height: 'auto',
            marginTop: '10px',
          }}
          src={image.url}
          rounded
          thumbnail="true"
        />
      ));
      return (
        <Container
          style={{ height: '150px' }}
          className="d-flex bd-highlight mb-3"
        >
          {thumbnails}
        </Container>
      );
    }
    return <></>;
  };
  const [thumbnails] = useState(renderThumbnails());

  const handleHelpfulClick = () => {
    if (!yesClicked) {
      setHelpful(helpful + 1);
      setYesClicked(true);
      const params = {
        reviewId,
      };
      axios.get('reviews/helpfulness', { params })
        .then(() => {
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  const handleReport = () => {
    if (!reportClicked) {
      const params = {
        reviewId,
      };
      axios.get('reviews/report', { params })
        .then(() => {
        })
        .catch((err) => {
          throw err;
        });
      setReportClicked(true);
    }
  };

  const getStrings = (text, max) => {
    let textStr = text.substring(0, max);
    let newIndex;
    const valid = [' ', '!', '.', '?'];
    for (let i = textStr.length; i >= 0; i -= 1) {
      if (valid.includes(textStr[i])) {
        newIndex = i;
        textStr = textStr.substring(0, i);
        break;
      }
    }
    const remainingStr = text.substring(newIndex);
    return [textStr, remainingStr];
  };

  const validateSummary = () => {
    if (summary.length > 60) {
      const [summaryStr, remainingStr] = getStrings(summary, 59);
      const sub = (<strong>{`${summaryStr}...`}</strong>);
      const remaining = (
        <div
          style={({
            color: '#949494',
            fontSize: '12px',
            marginTop: '10px',
            marginBottom: '20px',
          })}
        >
          {`...${remainingStr}`}
        </div>
      );
      return [sub, remaining];
    }
    return [<div><strong>{summary}</strong></div>];
  };

  const validateBody = () => {
    const [open, setOpen] = useState(false);
    if (body.length >= 250) {
      const [bodyStr, remainingStr] = getStrings(body, 249);
      return (
        <div>
          <div style={{ color: '#949494' }}>
            { `${bodyStr}...` }
          </div>
          <Collapse in={open}>
            <div>
              <Card.Text
                id="collapse-text"
                style={{ color: '#949494' }}
              >
                { remainingStr }
              </Card.Text>
            </div>
          </Collapse>
          <Button
            block="true"
            size="sm"
            style={{ color: '#949494' }}
            variant="link"
            onClick={() => setOpen(!open)}
            aria-controls="collapse-text"
            aria-expanded={open}
          >
            Show More
          </Button>
        </div>
      );
    }
    return body;
  };

  const validateRecommend = () => {
    if (recommend) {
      return (
        <div id="recommends">
          <i
            id="recommend-icon"
            className="bi bi-check2"
          />
          <div className="ml-2">
            I recommend this product
          </div>
        </div>
      );
    }
    return <></>;
  };

  const verifiedPurchaser = () => {
    if (purchased) {
      return (
        <div id="verified-purchaser">
          <i
            id="verified-icon"
            className="bi bi-check-circle-fill"
          />
          <div className="ml-2">
            Verified Purchaser
          </div>
        </div>
      );
    }
    return <></>;
  };

  const validateResponse = () => {
    const res = [];
    if (response) {
      res.push(
        <div
          className="mt2"
          style={{ backgroundColor: '#ebebeb' }}
          id="owner-response"
        >
          <div style={{ color: '#454545' }}>
            <strong>Response:</strong>
          </div>
          <div
            className="mt-2"
            style={{ fontSize: '15px' }}
          >
            {response}
          </div>
        </div>,
      );
    }
    return res;
  };

  return (
    <div className="review-tile">
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <div style={{ justifyContent: 'center' }}>
          <Image
            style={{
              width: '100%',
              height: 'auto',
            }}
            src={thumbnailModal}
            rounded
            thumbnail="true"
          />
          <button
            style={{
              marginTop: '2%',
              marginLeft: '5%',
              width: '90%',
              height: 'auto',
            }}
            type="button"
            onClick={handleClose}
            id="review-button"
          >
            Close
          </button>
        </div>
      </Modal>
      <Card
        style={{ color: '#525252' }}
        border="0"
      >
        <div id="star">
          <Rating
            stop={20}
            step={4}
            fractions={4}
            initialRating={ratingsRounded}
            readonly="true"
            quiet="false"
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
          />
        </div>
        <div
          id="user-container"
          className="d-inline-flex justify-content-end"
        >
          <div
            id="user-container-item"
            className="ml-3"
          >
            {reviewerName}
          </div>
          ,
          <div
            id="user-container-item"
            className="ml-3"
          >
            {date}
          </div>
          {verifiedPurchaser()}
        </div>
        <div
          className="mt-3"
          id="review-text-container"
          key={JSON.stringify(photos)}
        >
          <Card.Title>
            {validateSummary()}
          </Card.Title>
          { validateBody() }
        </div>
        { validateResponse() }
        { validateRecommend() }
        {thumbnails}
        <div
          style={{ color: '#949494' }}
          className="d-inline-flex"
        >
          <div className="mt-2">
            Was this helpful?
          </div>
          <a
            style={{ color: '#949494' }}
            id="helpful-yes"
            className="ml-auto p-2"
            onClick={handleHelpfulClick}
            aria-hidden="true"
          >
            <u>Yes</u>
          </a>
          <div className="mt-2">
            (
            {helpful}
            )
          </div>
          <div className="ml-auto p-2">
            |
          </div>
          <a
            style={{ color: '#949494' }}
            id="helpful-yes"
            className="ml-auto p-2"
            aria-hidden="true"
            onClick={handleReport}
          >
            <u>Report</u>
          </a>
        </div>
      </Card>
      <hr style={{ border: '1px solid black' }} />
    </div>
  );
};

export default ReviewTile;
