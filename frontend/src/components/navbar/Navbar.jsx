import { useState } from "react";
import { NavBarMenu } from "./dataNav";
import { BsDice5 } from "react-icons/bs";
import { IoPerson } from "react-icons/io5";
import { BiMenuAltRight } from "react-icons/bi";
import { BsCart } from "react-icons/bs";
import ResponsiveMenu from "./ResponsiveMenu";
import { Link } from "react-router";
import isLoggedIn from "../../pages/Login/isLoggedIn";

function Navbar() {
  const [open, setOpen] = useState(false);
  let buttonControll = false;
  buttonControll = isLoggedIn();

  return (
    <>
      <nav>
        <div className="container flex justify-between items-center py-8 ">
          {/* Logo Section */}
          <div className="texr-2xl flex items-center gap-2 font-bold uppercase ">
            <BsDice5 className="text-primary text-2xl" />
            <p>Razor</p>
            <p className="text-secondary ">Market</p>
          </div>

          {/* Menu Section */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-6 text-gray-600">
              {NavBarMenu.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.link}
                    className="inline-block py-1 px-3 hover:text-primary font-semibold"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Icons Section */}
          <div className="flex align-center justify-start">
            <button className="text-2xl hover:bg-secondary hover:text-white duration-200 rounded-full p-2">
              <BsCart />
            </button>

            {/* Estrutura condicional */}
            {buttonControll ? (
              <a
                href="/dashboard"
                className="text-2xl hover:bg-secondary hover:text-white duration-200 rounded-full p-2"
              >
                <IoPerson />
              </a>
            ) : (
              <a
                href="/login"
                className="text-2xl hover:bg-secondary hover:text-white duration-200 rounded-full p-2"
              >
                <IoPerson />
              </a>
            )}
          </div>

          {/* Mobile Hamburger Section */}
          <div className="md:hidden" onClick={() => setOpen(!open)}>
            <BiMenuAltRight className="text-4xl" />
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <ResponsiveMenu open={open} />
      {/* <p>{buttonControll.toString()}</p> */}
    </>
  );
}

export default Navbar;
