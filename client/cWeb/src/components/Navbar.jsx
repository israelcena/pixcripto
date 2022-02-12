import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { useState, useEffect, useRef } from "react";

import Logo from "../images/logo.png";

export default function Navbar() {
  const ref = useRef();
  const [toggleMenu, setToggleMenu] = useState(false);
  const NavbarItemTitle = ["Mercados", "Trocas", "Tutoriais", "Carteiras"];
  const NavbarItem = ({ title, classProps }) => {
    return <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>;
  };

  useOnClickOutside(ref, () => setToggleMenu(false));

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={Logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-center flex-initial">
        {NavbarItemTitle.map((title, index) => (
          <NavbarItem key={title + index} title={title} />
        ))}
        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
          Login
        </li>
      </ul>
      <div className="flex relative">
        {toggleMenu ? (
          <AiOutlineClose
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <ul ref={ref} className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2x1 md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white slide-right">
            <li className="text-x1 w-full my-2 cursor-pointer">
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            {NavbarItemTitle.map((title, index) => (
              <NavbarItem
                key={title + index}
                title={title}
                classProps="my-2 text-lg"
              />
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}

// Hook
function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}