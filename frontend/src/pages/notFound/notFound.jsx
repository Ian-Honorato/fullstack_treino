import { useState } from "react";

import Navbar from "../../components/navbar/Navbar";

function NotFound() {
  return (
    <>
      <div className="overflow-x-hidden">
        <Navbar />
      </div>
      <div className="flex align-center justify-center shadow-md">
        <h1 className="text-red-500 font-extrabold text-3xl">
          {" "}
          Pagina Não Encontrada!
        </h1>
      </div>
    </>
  );
}

export default NotFound;
