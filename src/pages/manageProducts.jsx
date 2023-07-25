import React, { useState } from "react";
import { Button, Modal, Input, Space, Form, notification } from "antd";
import { ScanOutlined } from "@ant-design/icons";
import ProductTables from "../components/productTables";
import ProductForm from "../components/productForm";
import { ProductContext } from "../contexts/productContext";
import {
  INSERT_PRODUCT,
  GET_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from "../helpers/queries";
import { useMutation, useQuery } from "@apollo/client";
import dayjs from "dayjs";

const ManageProducts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [form] = Form.useForm();
  const { Search } = Input;

  const { loading, error, data, refetch } = useQuery(GET_PRODUCT);
  const [insertProducts] = useMutation(INSERT_PRODUCT);
  const [updateProducts] = useMutation(UPDATE_PRODUCT);
  const [deleteProducts] = useMutation(DELETE_PRODUCT);

  // notification component
  const showNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
      placement: "topRight",
    });
  };

  const handleModal = () => {
    setIsModalOpen(true);
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleOnFinish = (values) => {
    setTimeout(() => {
      saveProductData(values);
      form.resetFields();
      setIsModalOpen(false);
    });
  };

  const handleEdit = (record) => {
    const { productID } = record;
    if (record) {
      setIsModalOpen(true);

      // find and compare if the key is existing then populate the form inputs
      const selectedTask = data.xpscanner_lite_products.find(
        (product) => product.productID === productID
      );

      form.setFieldsValue({
        product_id: selectedTask.productID,
        product_barcode: selectedTask.product_barcode,
        product_name: selectedTask.product_name,
        product_expiration: dayjs(selectedTask.product_expiration),
        product_category: selectedTask.product_category,
        product_description: selectedTask.product_description,
      });
    }
  };

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

  const saveProductData = (values) => {
    const { product_name, product_category, product_description } = values;
    const user_id = "d4868c8d-a0e3-4b56-b5ba-ae9abc5dc752";
    const product_expiration = dayjs(values.product_expiration);
    const product_barcode = "XPS-" + values.product_barcode;
    const productID = values.product_id;

    if (values.product_id) {
      handleUpdate({
        productID,
        product_name,
        product_expiration,
        product_category,
        product_description,
      });
      setIsModalOpen(false);
    } else {
      handleInsert({
        product_barcode,
        product_name,
        product_expiration,
        product_category,
        product_description,
        user_id,
      });
    }
  };

  const handleUpdate = ({
    productID,
    product_name,
    product_expiration,
    product_category,
    product_description,
  }) => {
    updateProducts({
      variables: {
        productID,
        product_name,
        product_expiration,
        product_category,
        product_description,
      },
    })
      .then(({ data }) => {
        const affectedRows = data.update_xpscanner_lite_products.affected_rows;
        if (affectedRows > 0) {
          refetch();
          showNotification(
            "success",
            "Updated successfully",
            "Product updated to the list!"
          );
        } else {
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle error case
      });
  };

  const handleInsert = ({
    product_barcode,
    product_name,
    product_expiration,
    product_category,
    product_description,
    user_id,
  }) => {
    insertProducts({
      variables: {
        product_barcode,
        product_name,
        product_expiration,
        product_category,
        product_description,
        user_id,
      },
    })
      .then(({ data }) => {
        const affectedRows = data.insert_xpscanner_lite_products.affected_rows;
        if (affectedRows > 0) {
          refetch();
          showNotification(
            "success",
            "Added successfully",
            "Task added to the list!"
          );
        } else {
        }
      })
      .catch((error) => {
        console.error("Error inserting data:", error);
        // Handle error case
      });
  };

  return (
    <ProductContext.Provider
      value={{
        form,
        loading,
        error,
        data,
        searchText,
        refetch,
        handleOnFinish,
        handleDelete,
        handleEdit,
      }}
    >
      <div>
        <h1 className="text-2xl font-bold mb-6">MANAGE PRODUCTS</h1>
        <Space wrap>
          <Button
            size="large"
            type="primary"
            icon={<ScanOutlined />}
            onClick={handleModal}
          >
            Scan Product
          </Button>
          <Search
            placeholder="Search products here"
            allowClear
            enterButtons
            size="large"
            onSearch={handleSearch}
          />
        </Space>

        <div>
          <Modal
            title="Enter Product"
            open={isModalOpen}
            onCancel={() => {
              setIsModalOpen(false);
            }}
            footer={[
              <Button
                onClick={() => {
                  form.resetFields();
                }}
              >
                Reset
              </Button>,
              <Button
                type="primary"
                onClick={() => {
                  form.submit();
                }}
              >
                Save
              </Button>,
            ]}
          >
            <ProductForm />
          </Modal>
          <ProductTables />
        </div>
      </div>
    </ProductContext.Provider>
  );
};

export default ManageProducts;
