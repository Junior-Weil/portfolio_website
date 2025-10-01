import React, { useState, useEffect } from "react";
import { Link, redirect } from "react-router-dom";
import ContactForm from "./ContactForm";

function NavItem({ text, to }) {
  const isExternal = to.startsWith("http") || to.startsWith("mailto:");

  if (isExternal) {
    return (
      <a
        href={to}
        target={"_blank"}
        rel="nooperner noreferrer"
        className="justify-center py-2 cursor-pointer hover:text-blue-600 transition-colors"
      >
        {text}
      </a>
    );
  }

  return (
    <Link
      to={to}
      className="justify-center py-2 cursor-pointer hover:text-blue-600 transition-colors"
    >
      {text}
    </Link>
  );
}

function HarmonyNav({ downloadVisible = false }) {
  const [navItems, setNavItems] = useState([
    { text: "AboutMe", to: "/" },
    { text: "Projects", to: "/projects" },
    // { text: "Todo", to: "/todo" },
  ]);
  const [profileNavItems, setProfileNavItems] = useState([
    { text: "GitHub", to: "https://github.com/Ronald-Weil" },
    { text: "LinkedIn", to: "https://www.linkedin.com/in/ronald-weil-9561a6251" },
    { text: "Email", to: "/contact" }
  ]);

  useEffect(() => {
    // Fetch navigation items from backend
    async function fetchNavItems() {
      try {
        const response = await fetch("/api/navItems");
        const data = await response.json();
        setNavItems(
          data.map((item) => ({
            ...item,
            onClick: () => alert(`Navigate to ${item.text}`),
          })),
        );
      } catch (error) {
        console.error("Failed to fetch navigation items", error);
      }
    }

    // fetchNavItems(); TODO enable this when backend is ready
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white">
      <div className="flex gap-5 justify-between items-center py-1.5 px-6 rounded-3xl backdrop-blur-[17.5px] bg-opacity-80 w-full max-w-full flex-wrap sm:flex-nowrap sm:py-4 sm:px-10 bg-[#ffffffff]">
        <div className="flex gap-4 justify-between items-center py-1.5 my-auto w-full sm:w-auto">
          <div className="flex justify-center items-center px-0.5">
            <Link className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold" to="/">
              <p className="text-white">
                JW
              </p>
            </Link>
          </div>
          <div className="my-auto font-bold text-lg text-zinc-950">
            <nav className="flex sm:flex-row flex-col gap-5 justify-center items-center self-stretch my-auto text-base text-center text-neutral-900 font-light w-full sm:w-auto">
              {profileNavItems.map((item, index) => (
                <NavItem key={index} text={item.text} to={item.to} />
              ))}
            </nav>

          </div>
        </div>
        <nav className="flex sm:flex-row flex-col gap-5 justify-center items-center self-stretch my-auto text-base text-center text-neutral-900 font-light w-full sm:w-auto">
          {navItems.map((item, index) => (
            <NavItem key={index} text={item.text} to={item.to} />
          ))}
        </nav>
        {downloadVisible && (
          <button
            className="justify-center self-stretch sm:self-auto px-6 py-5 text-base leading-6 text-center text-white rounded-2xl bg-neutral-900 max-md:px-5 font-light w-full sm:w-auto"
            onClick={() => alert("Download Now button clicked")}
          >
            Download Now
          </button>
        )}
      </div>
    </div>
  );
}

export default HarmonyNav;
