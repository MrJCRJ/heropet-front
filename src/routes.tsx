import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Home from "./pages/Home";
import FornecedorList from "./pages/Fornecedores/List";
import FornecedorCreate from "./pages/Fornecedores/Create";
import FornecedorEdit from "./pages/Fornecedores/Edit";
import FornecedorView from "./pages/Fornecedores/View";
import PedidoList from "./pages/Pedidos/List";
import PedidoCreate from "./pages/Pedidos/Create";
import PedidoView from "./pages/Pedidos/View";
import PedidoEdit from "./pages/Pedidos/Edit";
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
      {
        path: "pedidos",
        children: [
          {
            index: true,
            element: <PedidoList />,
          },
          {
            path: "novo",
            element: <PedidoCreate />,
          },
          {
            path: ":id",
            element: <PedidoView />,
          },
          {
            path: ":id/editar",
            element: <PedidoEdit />,
          },
        ],
      },
    ],
  },
]);
