import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, isLoggedIn }) {
  // Verifica se o usuário está logado
  if (!isLoggedIn) {
    return (
      <Navigate
        to="/"
        replace
        state={{ message: "O usuario deve estar logado" }}
      />
    ); // Redireciona para a rota inicial
  }
  return children;
}
