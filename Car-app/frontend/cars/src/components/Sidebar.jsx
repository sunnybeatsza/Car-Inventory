import React from "react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { useState } from "react";
import "./Sidebar.css";

function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const SidebarData = [
    {
      title: "Dashboard",
      path: "/",
      icon: <MdIcons.MdDashboard />,
    },

    {
      title: "Reports",
      path: "#",
      icon: <FaIcons.FaPaperPlane />,
    },
    {
      title: "Staff",
      path: "#",
      icon: <MdIcons.MdPerson />,
    },
    {
      title: "Financials",
      path: "#",
      icon: <FaIcons.FaMoneyCheck />,
    },
  ];

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <div className="sidebar">
        <button onClick={toggleSidebar}>
          <FaIcons.FaBars />
        </button>
      </div>

      <div className={showSidebar ? "sidebar-active" : "sidebar-disabled"}>
        <ul className="sidebar-items">
          <li className="navbar-toggle">
            <button onClick={toggleSidebar}>
              <MdIcons.MdClose />
            </button>
          </li>
        </ul>

        {/* Corrected map usage */}
        {SidebarData.map((data, index) => (
          <ul key={index}>
            <li>
              <span>{data.icon}</span>
              {data.title}
            </li>
          </ul>
        ))}
      </div>
    </>
  );
}

export default Sidebar;
