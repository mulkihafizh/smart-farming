import React, { useState } from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import "../../../assets/css/admin.css";

export default function AdminPage() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const handleToggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <section className="adminPage">
      <div id="adminSidebar" className={sidebarVisible ? "show" : ""}>
        <div className="sidebarTitle">
          <p>Smart Farming Tracker</p>
          <i
            className=" fa-solid fa-xmark toggle-sidebar"
            onClick={handleToggleSidebar}
          ></i>
        </div>
        <div className="sidebarMenu">
          <Link to={`/dashboard`}>
            <i className="fa-solid fa-user icon"></i> <p>Dashboard</p>
          </Link>
          <NavLink to={`/admin-dashboard`} id="linkAdmin" end>
            <i className="fa-solid fa-list icon" id="linkAdmin"></i>{" "}
            <p id="linkAdmin">List User</p>
          </NavLink>
          <NavLink to={`/admin-dashboard/types`} id="linkTypes">
            <i
              className="fa-sharp fa-solid fa-seedling icon"
              id="linkTypes"
            ></i>{" "}
            <p id="linkTypes">List Tipe Sensor</p>
          </NavLink>
        </div>
      </div>
      <div className="rightAdmin">
        <div className="header">
          <nav>
            <i
              className="fas fa-bars toggle-sidebar"
              onClick={handleToggleSidebar}
            ></i>
            <form action="#">
              <div className="form-group">
                <input type="text" placeholder="Search" />
                <i className="fa-solid fa-magnifying-glass icon"></i>
              </div>
            </form>
            <div className="userProfile">
              <p className="userName">Admin</p>
              <img
                className="userProfile"
                src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff&size=128&rounded=true&bold=true&font-size=0.44&length=1&uppercase=true&format=svg"
                alt=""
                onClick={handleProfileClick}
              />
              {showProfileMenu && (
                <ul className="profile-link show">
                  <Link to="#">
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    Logout
                  </Link>
                </ul>
              )}
            </div>
          </nav>
        </div>
        <div className="contentWrap">
          <div className="content">
            <div className="head-title">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
