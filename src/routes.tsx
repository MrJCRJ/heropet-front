import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import FornecedorList from "./pages/Fornecedores/List";
import FornecedorCreate from "./pages/Fornecedores/Create";
import FornecedorEdit from "./pages/Fornecedores/Edit";
import FornecedorView from "./pages/Fornecedores/View";
import PedidoList from "./pages/Pedidos";
import PedidoCreate from "./pages/Pedidos/Create";
import PedidoView from "./pages/Pedidos/View";
import PedidoEdit from "./pages/Pedidos/Edit";
import ClienteList from "./pages/Clientes/List";
import ClienteCreate from "./pages/Clientes/Create";
import ClienteEdit from "./pages/Clientes/Edit";
import ClienteView from "./pages/Clientes/View";
import { FinancaCreate } from "./pages/Financas/Create";
import { FinancaView } from "./pages/Financas/View";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true, // Esta é a rota raiz que mostrará o PedidoList
        element: <PedidoList />,
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
        path: "clientes",
        children: [
          {
            index: true,
            element: <ClienteList />,
          },
          {
            path: "novo",
            element: <ClienteCreate />,
          },
          {
            path: ":cpfOuCnpj",
            element: <ClienteView />,
          },
          {
            path: ":cpfOuCnpj/editar",
            element: <ClienteEdit />,
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
      {
        path: "financas",
        children: [
          {
            path: "novo",
            element: <FinancaCreate />,
          },
          {
            path: ":id",
            element: <FinancaView />,
          },
        ],
      },
    ],
  },
]);
