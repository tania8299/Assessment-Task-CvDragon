import { NavLink } from "react-router-dom";
import { Bars3Icon, ChevronRightIcon } from "@heroicons/react/24/outline";
import logo from "../assets/Images/logo.svg";
import dashboardActiveIcon from "../assets/Images/dasboard.svg";
import userInactiveIcon from "../assets/Images/Users.svg";
import dashboardInactiveIcon from "../assets/Images/dashboardinactive.svg";
import userActiveIcon from "../assets/Images/userInactive.svg";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
      activeIcon: dashboardActiveIcon,
      inactiveIcon: dashboardInactiveIcon,
    },
    {
      name: "User Management",
      path: "/users",
      activeIcon: userActiveIcon,
      inactiveIcon: userInactiveIcon,
    },
  ];

  return (
    <aside
      className={`${
        sidebarOpen ? "w-64" : "w-20"
      } sm:${sidebarOpen ? "w-56" : "w-16"} 
         bg-white shadow-lg rounded-2xl m-1 ml-2 mt-4 flex flex-col transition-all duration-300 relative flex-shrink-0`}
    >
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute -right-3 top-6 bg-yellow-400 cursor-pointer text-white p-1 rounded-full shadow-md"
      >
        {sidebarOpen ? (
          <ChevronRightIcon className="w-4 h-4" />
        ) : (
          <Bars3Icon className="w-4 h-4" />
        )}
      </button>
      <div className="p-4 flex items-center justify-center border-b border-gray-200">
        <img src={logo} alt="Logo" className={sidebarOpen ? "h-12" : "h-8"} />
      </div>
      <nav className="flex-1 px-2 py-6 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-2xl text-sm md:text-base transition ${
                isActive
                  ? "bg-[rgba(253,249,245,1)] text-yellow-500 font-semibold"
                  : "text-gray-500 font-normal hover:bg-gray-100"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={isActive ? link.activeIcon : link.inactiveIcon}
                  alt={link.name}
                  className="w-5 h-5 flex-shrink-0"
                />
                {sidebarOpen && (
                  <span className="truncate">{link.name}</span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      {sidebarOpen && (
        <div className="p-4 text-xs text-gray-500 border-t border-gray-200">
          Version 1.0.0.0
        </div>
      )}
    </aside>
  );
}
