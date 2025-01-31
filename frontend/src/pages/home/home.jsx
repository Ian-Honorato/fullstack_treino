import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router";

function Home() {
  const location = useLocation();
  const message = location.state?.message;
  return (
    <>
      <div className="overflow-x-hidden">
        <Navbar />
      </div>

      {message && (
        <div className="bg-red-600 text-white text-center">{message}</div>
      )}

      <div className="flex align-center justify-center">
        <h1 className="text-blue-500 font-extrabold text-3xl"> Home</h1>
      </div>
    </>
  );
}

export default Home;
