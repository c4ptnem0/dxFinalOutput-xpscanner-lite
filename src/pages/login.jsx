import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button, Checkbox, Form, Input } from "antd";
import { LOGIN_USER } from "../helpers/queries";
import { useMutation, useQuery } from "@apollo/client";
const LoginPage = () => {
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(LOGIN_USER);

  const handleOnFinish = (values) => {
    const { username, password } = values;
    if (data) {
      const affectedRows = data.delete_xpscanner_lite_products.affected_rows;
      if (affectedRows > 0) {
        console.log("login successfully!");
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Card
          bordered={false}
          style={{
            width: 400,
          }}
        >
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={handleOnFinish}
            autoComplete="off"
          >
            <p className="font-sans font-bold text-2xl text-center">
              LOGIN KANA KAY KUAN KA
            </p>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item className="flex justify-center">
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
          <a
            className="flex justify-center"
            onClick={() => {
              navigate(`/signUp`);
            }}
          >
            Signup anay dong
          </a>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;
