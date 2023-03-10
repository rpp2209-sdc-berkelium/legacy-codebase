import React, { useState, createContext, useContext } from 'react';
import { useNavigate } from  'react-router-dom';
import { useProductContext } from "../../Context/ContextProvider.jsx";
import { fetch } from "../../../../../server/utils/data-utils.js"

const RPContext = createContext();

export default function RPProvider({ children }) {
  const navigate = useNavigate();
  function changeProduct (id) {
    navigate(`/${id}`)
  };

  function toggleComparison(id) {
    setCompareId(id);
  }

  function fetchData(ep) {
    return new Promise((resolve, reject) => {
      const callback = (err, data) => {
        if(err) {
          reject(err);
        } else {
          resolve(data.data);
        }
      }
      fetch(ep, callback);
    })
  }

  const [currentProductData, setCurrentProductData] = useState(null);
  const [rpData, setRpData] = useState(null);
  const [rpStyles, setRpStyles] = useState(null);
  const [rpRatings, setRpRatings] = useState(null);
  const [outfitRatings, setOutfitRatings] = useState(null);
  const [compareId, setCompareId] = useState(null);

  const container = { fetchData, changeProduct, setCurrentProductData, setRpData, setRpStyles, setRpRatings, setOutfitRatings, toggleComparison, setCompareId, currentProductData, rpData, rpStyles, rpRatings, outfitRatings, compareId};

  return (
    <RPContext.Provider value={container}>
      {children}
    </RPContext.Provider>
  )
}

export function useRPContext() {
  return useContext(RPContext);
}