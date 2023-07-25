import { gql } from "@apollo/client";

export const INSERT_PRODUCT = gql`
  mutation InsertProduct(
    $product_name: String!
    $product_barcode: String!
    $product_expiration: date!
    $product_category: String!
    $product_description: String!
    $user_id: uuid!
  ) {
    insert_xpscanner_lite_products(
      objects: {
        product_name: $product_name
        product_barcode: $product_barcode
        product_expiration: $product_expiration
        product_category: $product_category
        product_description: $product_description
        user_id: $user_id
      }
    ) {
      affected_rows
    }
  }
`;

export const GET_PRODUCT = gql`
  query {
    xpscanner_lite_products {
      productID
      product_name
      product_barcode
      product_expiration
      product_category
      product_description
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $productID: uuid!
    $product_name: String!
    $product_expiration: date!
    $product_category: String!
    $product_description: String!
  ) {
    update_xpscanner_lite_products(
      where: { productID: { _eq: $productID } }
      _set: {
        productID: $productID
        product_name: $product_name
        product_expiration: $product_expiration
        product_category: $product_category
        product_description: $product_description
      }
    ) {
      affected_rows
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($productID: uuid!) {
    delete_xpscanner_lite_products(where: { productID: { _eq: $productID } }) {
      affected_rows
    }
  }
`;

export const LOGIN_USER = gql`
  query {
    xpscanner_lite_users {
      id
      username
      password
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($productID: uuid!) {
    xpscanner_lite_products(where: { productID: { _eq: $productID } }) {
      productID
      product_barcode
      product_name
      product_expiration
      product_category
      product_description
    }
  }
`;

export const GET_EXPIRED_PRODUCTS = gql`
  query GetExpiredProducts($currentDate: date!) {
    expiredProducts: xpscanner_lite_products(
      where: { product_expiration: { _lte: $currentDate } }
    ) {
      productID
      product_name
      product_barcode
      product_expiration
      product_category
      product_description
    }
  }
`;
