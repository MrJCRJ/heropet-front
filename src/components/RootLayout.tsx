// src/components/RootLayout.tsx
import { Outlet } from "react-router-dom";
import Layout from "./Layout";

const RootLayout = () => (
  <Layout>
    <Outlet />
  </Layout>
);

export default RootLayout;
