import React, { useContext } from "react";
import { Form, Input, DatePicker, Space } from "antd";
import { ProductContext } from "../contexts/productContext";
import Html5QrcodePlugin from "../components/Html5QrcodeScannerPlugin";

const { TextArea } = Input;

const ProductForm = () => {
  const { form, handleOnFinish } = useContext(ProductContext);

  const handleBarcodeScan = (decodedText) => {
    form.setFieldsValue({ product_barcode: decodedText });
  };

  return (
    <>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={handleOnFinish}
        autoComplete="off"
        form={form}
      >
        <Form.Item>
          <Html5QrcodePlugin
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={handleBarcodeScan}
          />
        </Form.Item>
        <Form.Item name="product_id" hidden>
          <Input />
        </Form.Item>
        <Form.Item
          name="product_barcode"
          rules={[
            {
              required: true,
              message: "Please input product barcode!",
            },
          ]}
        >
          <Input placeholder="Product Barcode" />
        </Form.Item>
        <Form.Item
          name="product_name"
          rules={[
            {
              required: true,
              message: "Please input product name!",
            },
          ]}
        >
          <Input placeholder="Product Name" />
        </Form.Item>
        <Form.Item
          name="product_expiration"
          rules={[
            {
              required: true,
              message: "Please input product date!",
            },
          ]}
        >
          <DatePicker
            placeholder="Product Expiration"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          name="product_category"
          rules={[
            {
              required: true,
              message: "Please input product category!",
            },
          ]}
        >
          <Input placeholder="Product Category" />
        </Form.Item>
        <Form.Item
          name="product_description"
          rules={[
            {
              required: true,
              message: "Please input product description!",
            },
          ]}
        >
          <TextArea placeholder="Product Description" />
        </Form.Item>
      </Form>
    </>
  );
};

export default ProductForm;
