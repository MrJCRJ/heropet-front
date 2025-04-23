import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Home from "./pages/Home";
import FornecedorList from "./pages/Fornecedores/List";
import FornecedorCreate from "./pages/Fornecedores/Create";
import FornecedorEdit from "./pages/Fornecedores/Edit";
import FornecedorView from "./pages/Fornecedores/View";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "fornecedores",
        children: [
          {
            index: true,
            element: <FornecedorList />,
          },
          {
            path: "novo",
            element: <FornecedorCreate />,
          },
          {
            path: ":cnpj",
            element: <FornecedorView />,
          },
          {
            path: ":cnpj/editar",
            element: <FornecedorEdit />,
          },
        ],
      },
    ],
  },
]);
