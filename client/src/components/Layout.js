import React, { useContext } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../pages/Home";
import "./layout.css";

function Layout({ children }) {
  const navigate = useNavigate();
  const user = useContext(userContext);

  console.log("vannu makkalee");
  console.log(user, "it user");

  const location = useLocation();
  console.log(location);

  const userMenu = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Book Your Seat",
      link: "/applyevent",
    },
    {
      name: "Check Status",
      link: "/Status",
    },
    {
      name: "Logout",
      link: "/logout",
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Users",
      link: "/users",
    },
    {
      name: "Check Status",
      link: "/Status",
    },
    {
      name: "Logout",
      link: "/logout",
    },
  ];

  const menuToBeRendered = user ? adminMenu : userMenu;

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="logo">ADNOX</h1>
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.link; //location.pathname >>>>> useLocation lle field aanu
              return (
                <div
                  className={`d-flex menu-item ${isActive &&
                    "active-menu-item"}`}
                >
                  <Link to={menu.link}>{menu.name}</Link>
                </div>
              );
            })}

            <div
              className={`d-flex menu-item`}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <Link to="/login">Logout</Link>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="header">
            <div className="d-flex"></div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
