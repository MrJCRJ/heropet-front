// src/components/layout/RootLayout.tsx
import { Outlet } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

const RootLayout = () => (
  <MainLayout
    cardClassName="bg-white border border-gray-100 shadow-xl" // Card moderno
    cardShadow={false} // Já usamos shadow-xl na classe acima
  >
    <Outlet />
  </MainLayout>
);

export default RootLayout;
