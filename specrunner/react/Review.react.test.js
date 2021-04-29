import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import ReviewTile from '../../client/src/components/R-and-R/components/review-tile';
import ReviewList from '../../client/src/components/R-and-R/components/reviews-list';
import Review from '../../client/src/components/R-and-R/r-and-r';
import ResponseForm from '../../client/src/components/R-and-R/components/response-form';

afterEach(cleanup);

test('Review renders', () => {
  const { getByText } = render(<Review />);
  const root = document.createElement('div');
  ReactDOM.render(<Review />, root);
  getByText('RATINGS & REVIEWS');
});

test('ReviewList renders tiles', async () => {
  const review = {
    "review_id": 3,
    "rating": 4,
    "summary": "I am liking these glasses",
    "recommend": false,
    "response": "Glad you're enjoying the product!",
    "body": "They are very dark. But that's good because I'm in very sunny spots",
    "date": "2019-06-23T00:00:00.000Z",
    "reviewer_name": "bigbrotherbenjamin",
    "helpfulness": 5,
    "photos": [],
  }
  const { container } = render(
  <ReviewList 
    reviews={[review, review, review, review]}
  />
  );
  await waitFor(() => {
    expect(container.getElementsByClassName('review-tile').length).toBe(2);
  });
});

test('Write new review modal opens', () => {
  const { getByText } = render(<ResponseForm />);
  fireEvent.click(getByText('ADD A REVIEW +'));
  getByText('Write your review');
});

test('Show more button expands the list by two', async () => {
  const review = {
    "review_id": 3,
    "rating": 4,
    "summary": "I am liking these glasses",
    "recommend": false,
    "response": "Glad you're enjoying the product!",
    "body": "They are very dark. But that's good because I'm in very sunny spots",
    "date": "2019-06-23T00:00:00.000Z",
    "reviewer_name": "bigbrotherbenjamin",
    "helpfulness": 5,
    "photos": [],
  }
  const { container, getByText } = render(
  <ReviewList 
    reviews={[review, review, review, review]}
  />
  ); 
  await waitFor(() => {
    expect(container.getElementsByClassName('review-tile').length).toBe(2);
  });
  fireEvent.click(getByText('SHOW MORE'));
  await waitFor(() => {
    expect(container.getElementsByClassName('review-tile').length).toBe(4);
  });
});
