const axios = require('axios');
import React, { useState, useEffect } from "react";
import { useProductContext } from '../Context/ContextProvider.jsx'
import { useRPContext } from "./Context/RPProvider.jsx";
import calculateRatings from "./RatingCalculator.jsx";
import RPList from "./RPList.jsx";
import YourOutfitList from "./YourOutfitList.jsx"

import styles from './RP.module.css';
import globalStyles from '../Home/home.module.css';

function RelatedProducts () {
  const { currentProductId } = useProductContext();
  const { fetchData, product_id, setRpData, setRpStyles, setRpRatings, setCurrentProductData } = useRPContext();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let idList;
    fetchData(`products/${currentProductId}/related`)
    .then((ids) => {
      idList = [...new Set(ids)];
      return Promise.all(idList.map((id) => {
        return fetchData(`products/${id}`)
      }))
    })
    .then((data) => {
      setRpData(data);
      return Promise.all(idList.map((id) => {
        return fetchData(`products/${id}/styles`)
      }))
    })
    .then((styles) => {
      var styleState = {}
      styles.forEach((product) => {
        styleState[product.product_id] = product.results;
      })
      setRpStyles(styleState);
      return Promise.all(idList.map((id) => {
        return fetchData(`reviews/meta?product_id=${id}`)
      }))
    })
    .then((reviews) => {
      var ratingList = calculateRatings(reviews);
      setRpRatings(ratingList);
      return fetchData(`products/${currentProductId}`)
    })
    .then((currentProductData) => {
      setCurrentProductData(currentProductData);
      setLoaded(true);
    })
  },[currentProductId]);

  return (
      <div className={globalStyles.container} data-testid='rp'>
        {loaded ? <><RPList/><br/></> : null}
        {loaded ? <><YourOutfitList/></>: null}
      </div>
  )
}

export default RelatedProducts;