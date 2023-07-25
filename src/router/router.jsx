import MainLayout from "../layout/mainLayout";
import DashBoard from "../pages/dashboard";
import ManageProducts from "../pages/manageProducts";
import LoginPage from "../pages/login";
import ProductInformation from "../pages/productInformation";
import ExpiredProducts from "../pages/expiredProducts";

const Router = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <DashBoard />,
      },
      {
        path: "/manageProducts",
        element: <ManageProducts />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/productInformation/:key",
        element: <ProductInformation />,
      },
      {
        path: "/expiredProducts",
        element: <ExpiredProducts />,
      },
    ],
  },
];

export default Router;
