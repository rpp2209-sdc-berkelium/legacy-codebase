const express = require('express')
const router = express.Router()
const axios = require('axios');
require("dotenv").config();





router.post('/results', async (req, res) => {

  const product_id = req.body.product_id
  const sortOrder = req.body.sortOrder;
  const count = req.body.count;



  try {
    const data = await axios({
      method: 'get',
      url: process.env.API_URL + `/reviews?product_id=${product_id}&sort=${sortOrder}&count=${count}`,
      headers: { "Authorization": `${process.env.API_KEY}` }
    })
    res.status(200).json(data.data)

  } catch (error) {
    console.log(error);
    res.status(400).json('error');
  }

})



router.post('/', async (req, res) => {
  const payload = await req.body.payload;
  console.log(process.env.API_KEY)
  console.log(payload, 'payload');
  const { productId, rating, recommend, summary, firstName, lastName, email, password, refundForm, body, photos } = payload;
  axios({
    method: 'post',
    url: `${process.env.API_URL}/reviews`,
    headers: {
      'Authorization': process.env.API_KEY,
      'Content-Type': 'application/json'
    },
    data: {
      product_id: parseInt(71692),
      rating: parseInt(rating),
      summary,
      body,
      recommend: true,
      name: firstName,
      email,
      photos: ['123.jpg'],
      "characteristics": {
        "Size": 2,
        "Width": 3,
        "Comfort": 3
    }
    }
  })
    .then(() => {
      res.status(200).send('successfull post')
      res.redirect(`/${productId}`);//get last url
    })
    .catch(err => {
      console.log('Err Saving Review', err);
      res.status(401).end(JSON.stringify(err));
    });
});


// const {firstName , lastName , email, password, body, requiredDocument} = await req.body.data.payload


// console.log(firstName);







module.exports = router;