import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { Navigate, useLocation } from "react-router";

import isLogged from "../Login/isLoggedIn";

function Dashboard() {
  const auth = isLogged();
  const [permission, setPermission] = useState(null);
  const location = useLocation();
  const acess = location.state?.acess;
  console.log("Acess " + acess);
  console.log("auth " + auth);

  useEffect(() => {
    if (location.state || auth) {
      setPermission(true);

      console.log("a permission: " + permission);
    } else {
      setPermission(false);
    }
  }, [acess, auth]);

  console.log("a permission: " + permission);

  if (permission === false) {
    return (
      <Navigate to="/" state={{ message: "O usuário deve estar logado" }} />
    );
  }
  return (
    <>
      <div className="overflow-x-hidden">
        <Navbar />
      </div>
      <div className="flex align-center justify-center">
        <h1 className="text-blue-500 font-extrabold text-3xl"> Dashboard</h1>
      </div>
    </>
  );
}

export default Dashboard;
