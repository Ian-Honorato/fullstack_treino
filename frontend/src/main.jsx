import { StrictMode } from "react";

//router import
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router";

//css import global
import "./index.css";
//componentes
import Home from "./pages/home/home";
import Mercado from "./pages/mercado/mercado";
import Contato from "./pages/contato/contato";
import NotFound from "./pages/notFound/notFound";
import Login from "./pages/Login/login";
import isLogged from "./pages/Login/isLoggedIn";
import Dashboard from "./pages/dashboard/dashboard";
//verifica sessao
import ProtectedRoute from "./Provider/PortectdRoute";
import Produto from "./pages/produto/produto";

const isLoggedIn = isLogged();

//Pages import
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/mercado",
    element: <Mercado />,
  },
  {
    path: "/produto/:id",
    element: <Produto />,
  },
  {
    path: "/contato",
    element: (
      <ProtectedRoute isLoggedIn={isLoggedIn}>
        <Contato />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
