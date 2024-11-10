import React from "react";
import axios from "axios";

function Products() {
  function getProducts() {
    const result = axios.post(
      "/api/user/products",
      {
        name: "",
        description: "",
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
  }

  return <div>Products</div>;
}

export default Products;
