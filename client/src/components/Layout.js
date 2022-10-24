import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import './layout.css'
 
function Layout({ children }) {
  const {user} = useSelector((state)=> state.user)  
  const location = useLocation()
  console.log(location);



  const userMenu = [
    {
      name: "Home",
      link: "/"
    },
    {
   
      name: "Book Your Seat",
      link: "/Book"
    },
    {
      name: "Check Status",
      link: "/Status"
    
    },
    {
      name: "Logout",
      link: "/logout"
    }

  ]

  const menuToBeRendered = userMenu

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1>ADNOX</h1>
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu)=>{
              const isActive  = location.pathname === menu.link //location.pathname >>>>> useLocation lle field aanu
              return <div className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                  <Link to={menu.link}>{menu.name}</Link>
              </div>
            })}
          </div>
        </div>

        <div className="content">
          <div className="header">
          <div className="d-flex">
          

          </div>
            </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
