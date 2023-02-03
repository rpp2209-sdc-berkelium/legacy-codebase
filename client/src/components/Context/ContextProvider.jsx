import React, { createContext, useContext, useState } from "react";
import useFetchProduct from '../../components/Hooks/useFetchProduct.jsx';
import useClickLogger from '../../components/Hooks/useClickLogger.jsx';

const ProductContext = createContext(null);

export default function ContextProvider({ children }) {

  // Gabby Comment: Changing the default product ID because the old one
  // (71697) has no image urls to test with (not sure why)
  const [currentProductId, setCurrentProductId] = useState(71699)

  const { response, loading, error } = useFetchProduct(currentProductId)

  const handleCurrentId = (e, productId) => {
    e.preventDefault();
    setCurrentProductId(productId)
  }

  return (
    <ProductContext.Provider value={{ loading, error, response, handleCurrentId, currentProductId, setCurrentProductId, useClickLogger }}>
      {children}
    </ProductContext.Provider>
  )
}


export function useProductContext() {
  return useContext(ProductContext);
}