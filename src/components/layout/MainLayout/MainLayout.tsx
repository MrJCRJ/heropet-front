import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useConnectionStatus } from "../../../hooks/useConnectionStatus";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { LayoutProps } from "./constants";

export const MainLayout = ({
  children,
  cardClassName = "bg-white",
  cardShadow = true,
}: LayoutProps) => {
  const { isOnline, isLoading } = useConnectionStatus();
  const [showConnectionAlert, setShowConnectionAlert] = useState(!isOnline);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setShowConnectionAlert(!isOnline);
  }, [isOnline]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header showConnectionAlert={showConnectionAlert} />

      <main className="flex-1 p-4 sm:p-6">
        {isLoading ? (
          <div className="max-w-7xl mx-auto flex items-center justify-center h-64">
            <LoadingSpinner size="lg" variant="primary" />
          </div>
        ) : (
          <div
            className={`max-w-7xl mx-auto p-8 rounded-xl border border-gray-200 ${
              cardShadow ? "shadow-md" : ""
            } ${cardClassName}`}
          >
            {children || <Outlet />}
          </div>
        )}
      </main>

      <Footer currentYear={currentYear} />
    </div>
  );
};
