import { useState } from "react";
import { useDispatch } from "react-redux";
import { setbackgroundColor } from "../store/kanbanSlice";

const Header = () => {
  const dispatch = useDispatch();

  const changeBackgroundColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    dispatch(setbackgroundColor(randomColor));
  };
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const links = [
    {
      title: "Completed Tasks",
      link: "/",
    },
    {
      title: "Deleted Tasks",
      link: "/",
    },
    {
      title: "All Tasks",
      link: "/",
    },
  ];

  return (
    <header className="bg-black shadow-md h-16 w-full fixed top-0 left-0 flex justify-between px-4 md:px-6 z-20">
      <div className="flex items-center font-mono font-semibold text-lg space-x-2 cursor-pointer">
        <h1 className="text-green-500 text-xl">Tasked.io</h1>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-yellow-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
            />
          </svg>
        </span>
      </div>

      <ul
        className={`md:flex md:items-center md:pb-0 pb-6 absolute md:static bg-transparent/[0.5] text-white space-x-4 md:z-auto z-[-1] left-[-1000px] top-0 w-full md:w-auto text-center transition-all duration-500 ease-in ${
          open ? "left-[0px] top-16" : "left-[-1000px] top-0"
        }`}
      >
        {links.map((link, index) => (
          // using index as array is static
          <li key={index} className="p-4 font-mono">
            <a
              href={link.link}
              className="hover:text-green-500 duration-300 text-lg md:text-lg"
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>

      <button className="md:hidden text-white" onClick={toggleMenu}>
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        )}
      </button>
      <button
        onClick={changeBackgroundColor}
        className="h-6 w-6 rounded-full bg-white translate-y-[600px]"
      ></button>
    </header>
  );
};

export default Header;
