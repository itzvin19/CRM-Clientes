import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NuevoCliente, {
  action as nuevoClienteAction,
} from "./pages/NuevoCliente";
import Layout from "./components/Layout";
import EditarPage, { loader as editarLoader ,action as editarAction} from "./pages/EditarPage";
import Index, { loader as clientesLoader } from "./pages/Index";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: clientesLoader,
        errorElement: <ErrorPage></ErrorPage>,
      },
      {
        path: "/clientes/nuevo",
        element: <NuevoCliente> </NuevoCliente>,
        action: nuevoClienteAction,
        errorElement:<ErrorPage></ErrorPage>
      },
      {
        path: "/clientes/:clienteId/editar",
        element: <EditarPage></EditarPage>,
        loader: editarLoader,
        action:editarAction,
        errorElement: <ErrorPage></ErrorPage>
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
