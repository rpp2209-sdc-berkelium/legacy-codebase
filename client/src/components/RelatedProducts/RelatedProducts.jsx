import React from "react";
import fetch from "../../../../server/fetch.js"
import RPList from "./RPList.jsx";
import YourOutfitList from "./YourOutfitList.jsx"

function RelatedProducts (props) {
  useEffect(() => {

  },[]);

  return (
    <div>
      <RPList />
      <YourOutfitList />
    </div>
  )
}

export default RelatedProducts;