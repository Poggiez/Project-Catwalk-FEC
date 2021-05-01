const bodyparser = require('body-parser');
const axios = require('axios');
const path = require('path');
const express = require('express');
const cors = require('cors');

// const { API_KEY } = process.env.API_KEY;
const API_KEY = require('../config');
console.log(API_KEY)

const apiUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/';
const port = process.env.PORT || 3000;
const app = express();
app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.static(path.join(__dirname, '../client/src/components')));

app.use(cors());
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.listen(port);

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.post('/', (req, res) => {
  res.sendStatus(201);
});

app.get('/reviews', (req, res) => {
  const reviewHeader = {
    headers: {
      Authorization: API_KEY,
    },
    params: {
      page: req.query.page || 1,
      count: req.query.count || 5,
      sort: req.query.sort || 'relevant',
      product_id: parseInt(req.query.product_id, 10) || 16056,
    },
  };
  axios.get(`${apiUrl}reviews/`, reviewHeader)
    .then((response) => {
      res.json({ response: response.data });
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.post('/reviews', (req, res) => {
  axios.post(`${apiUrl}reviews/`, req.body, {
    headers: {
      Authorization: API_KEY,
      'Content-Type': 'application/json',
    },
  })
    .then(() => {
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.get('/reviews/report', (req, res) => {
  const reviewHeader = {
    headers: {
      Authorization: API_KEY,
    },
  };
  axios.put(`${apiUrl}reviews/${req.query.reviewId}/report`, req.query.reviewId, reviewHeader)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(() => {
      res.sendStatus(401);
    });
});

app.get('/reviews/helpfulness', (req, res) => {
  const reviewHeader = {
    headers: {
      Authorization: API_KEY,
    },
  };
  axios.put(`${apiUrl}reviews/${req.query.reviewId}/helpful`, req.query.reviewId, reviewHeader)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(() => {
      res.sendStatus(401);
    });
});

app.get('/productById', (req, res) => {
  const reviewHeader = {
    headers: {
      Authorization: API_KEY,
    },
    params: {
      product_id: req.query.product_id || 16056,
    },
  };
  console.log(reviewHeader)
  axios.get(`${apiUrl}products/${req.query.product_id}`, reviewHeader)
    .then((response) => {
      res.json({ response: response.data });
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.get('/products', (req, res) => {
  const reviewHeader = {
    headers: {
      Authorization: API_KEY,
    },
  };
  axios.get(`${apiUrl}products`, reviewHeader)
    .then((response) => {
      res.json({ response: response.data });
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.get('/styles', (req, res) => {
  const reviewHeader = {
    headers: {
      Authorization: API_KEY,
    },
  };
  axios.get(`${apiUrl}products/${req.query.id}/styles`, reviewHeader)
    .then((response) => {
      res.json({ response: response.data });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.get('/related', (req, res) => {
  const result = [];
  axios.get(`${apiUrl}/products/${req.query.id}/related`, { headers: { Authorization: API_KEY } })
    .then(((items) => {
      // iterates through array and makes GET requests at the corresponding ids
      items.data.forEach((id) => {
        const info = axios.get(`${apiUrl}/products/${id}`, { headers: { Authorization: API_KEY } });
        const styles = axios.get(`${apiUrl}/products/${id}/styles`, { headers: { Authorization: API_KEY } });
        Promise.all([info, styles])
          .then((ress) => {
            result.push({ productInfo: ress[0].data, styleInfo: ress[1].data });
          })
          .catch((err) => {
            throw err;
          });
      });
    }));
  res.send(result);
});
