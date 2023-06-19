import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/admin.css";

export default function AdminPage() {
  // const [handleSidebar, setSidebar] = useState(true);

  // const handleSidebarClicked = () => {
  //   setSidebar((prevState) => !prevState);
  // };

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
      <div id="sidebar" className={sidebarVisible ? "show" : ""}>
        <div className="sidebarTitle">
          <p>Smart Farming Tracker</p>
        </div>
        <div className="sidebarMenu">
          <Link to={`/dashboard`}>
            <i className="fa-solid fa-user icon"></i> <p>Dashboard</p>
          </Link>
          <Link to={`/dashboard/admin/users`}>
            <i className="fa-solid fa-list icon"></i> <p>List User</p>
          </Link>
          <Link to={`/dashboard/admin/types`}>
            <i className="fa-sharp fa-solid fa-seedling icon"></i>{" "}
            <p>List Tipe Lahan</p>
          </Link>
        </div>
      </div>
      <div className="content">
        <nav>
          <i
            className="fas fa-bars toggle-sidebar"
            onClick={handleToggleSidebar}
          ></i>
          <form action="#">
            <div className="form-group">
              <input type="text" placeholder="search" />
              <i className="fa-solid fa-magnifying-glass icon"></i>
            </div>
          </form>
          <div className="userProfile">
            <img
              className="userProfile"
              src="https://img.wattpad.com/5edad7765319cd862679ee6a481c19eadb22a39f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f3979324d3941414a6b64685359673d3d2d3838363634363239372e313630666132353063336133306534623333383235373633393935362e6a7067?s=fit&w=720&h=720"
              alt=""
              onClick={handleProfileClick}
            />
            {showProfileMenu && (
              <ul className="profile-link show">
                <Link to="#">
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>Logout
                </Link>
              </ul>
            )}
          </div>
        </nav>
      </div>
      <div className="header">
        <div className="head-title">
          <div className="title">
            <h1>Dashboard</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Date</th>
                <th>Status</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ai hoshino</td>
                <td>gatau</td>
                <td>mokad</td>
                <td>wassalam</td>
              </tr>
              <tr>
                <td>aldi taher</td>
                <td>assalamualaikum wr wb</td>
                <td>look at the star</td>
                <td>wassalam</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
