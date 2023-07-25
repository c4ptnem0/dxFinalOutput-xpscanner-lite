import React, { useState } from "react";
import { Space, Input, notification, Button, Tooltip } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { GET_EXPIRED_PRODUCTS, DELETE_PRODUCT } from "../helpers/queries";
import { ProductContext } from "../contexts/productContext";
import ExpiredProductTables from "../components/expiredProductTables";
import { useMutation, useQuery } from "@apollo/client";
import dayjs from "dayjs";

const ExpiredProducts = () => {
  const { Search } = Input;
  const [searchText, setSearchText] = useState("");
  const [deleteProducts] = useMutation(DELETE_PRODUCT);
  const currentDate = dayjs().format("YYYY-MM-DD"); // Format currentDate as "YYYY-MM-DD" string

  // notification component
  const showNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
      placement: "topRight",
    });
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const { data, loading, error, refetch } = useQuery(GET_EXPIRED_PRODUCTS, {
    variables: {
      currentDate, // Pass the current date as a variable to the query
    },
  });

  if (error) {
    console.log(error);
  }

  const handleDelete = (record) => {
    const { productID } = record;
    deleteProducts({ variables: { productID: productID } })
      .then(({ data }) => {
        const affectedRows = data.delete_xpscanner_lite_products.affected_rows;
        if (affectedRows > 0) {
          refetch();
          showNotification(
            "success",
            "Deleted successfully",
            "Product deleted to the list!"
          );
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle error case
      });
  };

  // Data is available, proceed with rendering
  const expiredProducts = data?.expiredProducts;

  console.log(expiredProducts);
  return (
    <ProductContext.Provider
      value={{
        data,
        loading,
        searchText,
        expiredProducts,
        handleDelete,
        refetch,
      }}
    >
      <div>
        <h1 className="text-2xl font-bold mb-6">EXPIRED PRODUCTS</h1>
        <Space wrap>
          <Search
            placeholder="Search products here"
            allowClear
            enterButtons
            size="large"
            onSearch={handleSearch}
          />
          <Tooltip title="Refresh">
            <Button
              size="large"
              onClick={() => {
                window.location.reload(false);
              }}
            >
              <ReloadOutlined />
            </Button>
          </Tooltip>
        </Space>
        <ExpiredProductTables />
      </div>
    </ProductContext.Provider>
  );
};

export default ExpiredProducts;
