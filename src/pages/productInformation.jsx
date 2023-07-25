import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BY_ID } from "../helpers/queries";
import { useParams } from "react-router-dom";

const ProductInformation = () => {
  const { key } = useParams();

  const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { productID: key },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const product = data.xpscanner_lite_products[0]; // Assuming productID is unique and will return only one product

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">MANAGE PRODUCTS</h1>
      <div>
        <h1 className="text-base font-bold">
          Product Name: {product.product_name}
        </h1>
        <h1 className="text-base font-bold">
          Product Barcode: {product.product_barcode}
        </h1>
        <h1 className="text-base font-bold">
          Product Expiration: {product.product_expiration}
        </h1>
        <h1 className="text-base font-bold">
          Product Category: {product.product_category}
        </h1>
        <h1 className="text-base font-bold">
          Product Description: {product.product_description}
        </h1>
      </div>
    </div>
  );
};

export default ProductInformation;
