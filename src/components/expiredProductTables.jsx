import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table, Space, Popconfirm, Skeleton } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import { ProductContext } from "../contexts/productContext";

const ExpiredProductTables = () => {
  const navigate = useNavigate();
  const { loading, searchText, expiredProducts, handleDelete, refetch } =
    useContext(ProductContext);

  const handleNavigate = (record) => {
    const { productID } = record;
    return () => {
      navigate(`/productInformation/${productID}`);
    };
  };

  // Apply search logic to filter the data based on the searchText
  const filteredData = expiredProducts
    ? expiredProducts.filter((prod) => {
        const barcodeMatch = prod.product_barcode
          .toLowerCase()
          .includes(searchText.toLowerCase());
        const nameMatch = prod.product_name
          .toLowerCase()
          .includes(searchText.toLowerCase());
        const expirationMatch = prod.product_expiration
          .toLowerCase()
          .includes(searchText.toLowerCase());
        const categoryMatch = prod.product_category
          .toLowerCase()
          .includes(searchText.toLowerCase());

        return (
          barcodeMatch || nameMatch || expirationMatch || categoryMatch // Include the 'hasExpired' condition
        );
      })
    : [];

  const columns = [
    {
      title: "Barcode",
      dataIndex: "product_barcode",
      key: "product_barcode",
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Expiration",
      dataIndex: "product_expiration",
      key: "product_expiration",
    },
    {
      title: "Category",
      dataIndex: "product_category",
      key: "product_category",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => {
        refetch();
        return (
          <>
            <Space size="small">
              {/* Delete Button */}
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={() => {
                  handleDelete(record);
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button>
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
              <Button onClick={handleNavigate(record)}>
                <FileSearchOutlined />
              </Button>
            </Space>
          </>
        );
      },
    },
  ];

  return (
    <div className="mt-5">
      {loading ? (
        // Show Skeleton when data is loading
        <Skeleton active />
      ) : (
        // Show Table when data is available
        <Table columns={columns} dataSource={filteredData} />
      )}
    </div>
  );
};

export default ExpiredProductTables;
