import React, { useEffect, useState } from "react";
import axios from "axios";

import ProductTypeList from "./ProductTypeList";

const ProductTypePage = props => {
  const [productTypeList, setProductTypeList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/api/product_types");
        console.log(data._embedded.productTypeList);
        setProductTypeList(data._embedded.productTypeList);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return <ProductTypeList items={productTypeList} />;
};
export default ProductTypePage;
