// src/components/layout/RootLayout.tsx
import { Outlet } from "react-router-dom";
import { MainLayout } from "../MainLayout";

interface RootLayoutProps {
  cardClassName?: string;
  cardShadow?: boolean;
}

const RootLayout = ({
  cardClassName = "bg-white border border-gray-100 shadow-xl",
  cardShadow = false,
}: RootLayoutProps) => (
  <MainLayout cardClassName={cardClassName} cardShadow={cardShadow}>
    <Outlet />
  </MainLayout>
);

export default RootLayout;
