/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import API_KEY from '../../../../../config';
import 'regenerator-runtime/runtime';

const apiURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax';

const apiFunc = {

  getRelatedData: async (currentId, dataFunc) => {
    if (currentId) {
      // container for data
      const result = [];
      // gets an array of ids that are related to current item
      let response = await axios.get(`${apiURL}/products/${currentId}/related`, { headers: { Authorization: API_KEY } });
      const relatedIDs = response.data;

      const productInfo = {};
      const styleInfo = {};

      // for each id in relateIDs, call this endpoint in parallel
      await Promise.all([

        Promise.all(relatedIDs.map(async (id, index) => {
          let response = await axios.get(`${apiURL}/products/${id}`, { headers: { Authorization: API_KEY } });
          productInfo[id] = response.data;
        })),
        Promise.all(relatedIDs.map(async (id, index) => {
          let response = await axios.get(`${apiURL}/products/${id}/styles`, { headers: { Authorization: API_KEY } });
          styleInfo[id] = response.data;
        })),

      ]);

      relatedIDs.forEach((id) => {
        result.push({ productInfo: productInfo[id], styleInfo: styleInfo[id] });
      });

      dataFunc(result);
    }
  },

  getProductData: async (array, dataFunc) => {
    // container for data
    const result = [];

    const productInfo = {};
    const styleInfo = {};

    // for each id in relateIDs, call this endpoint in parallel
    await Promise.all([

      Promise.all(array.map(async (id, index) => {
        const response = await axios.get(`${apiURL}/products/${id}`, { headers: { Authorization: API_KEY } });
        productInfo[id] = response.data;
      })),
      Promise.all(array.map(async (id, index) => {
        const response = await axios.get(`${apiURL}/products/${id}/styles`, { headers: { Authorization: API_KEY } });
        styleInfo[id] = response.data;
      })),

    ]);

    array.forEach((id) => {
      result.push({ productInfo: productInfo[id], styleInfo: styleInfo[id] });
    });

    dataFunc(result);
  },

};

export default apiFunc;
