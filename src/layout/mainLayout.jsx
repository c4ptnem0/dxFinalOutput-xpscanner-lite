import React, { useState } from "react";
import {
  DashboardOutlined,
  WarningOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useLocation, useNavigate, useOutlet } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const outlet = useOutlet();

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="w-full h-screen">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={location.pathname}
          mode="inline"
          onClick={handleMenuClick}
          items={[
            {
              key: "/",
              icon: <DashboardOutlined />,
              label: "Dashboard",
            },
            {
              key: "/manageProducts",
              icon: <ShoppingCartOutlined />,
              label: "Manage Products",
            },
            {
              key: "/expiredProducts",
              icon: <WarningOutlined />,
              label: "Expired Products",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 16px",
            }}
          >
            <Breadcrumb.Item></Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <p>{outlet}</p>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
