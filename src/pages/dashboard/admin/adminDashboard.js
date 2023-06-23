import React, { useState, useEffect } from "react";
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import "../../../assets/css/admin.css";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function AdminPage(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const handleToggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  useEffect(() => {
    if (!cookies.token) {
      navigate("/login");
    }
    const getUsers = async () => {
      await axios
        .get(
          process.env.REACT_APP_API_URL +
            "/user/dashboard/admin/" +
            cookies.token,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setIsLoading(false);
        })
        .catch((err) => {
          if (err.response.status === 401 && cookies.token) {
            navigate("/dashboard");
            props.showToast("Anda Tidak Memiliki Akses!", true);
          } else if (err.response.status === 401 && !cookies.token) {
            navigate("/login");
            props.showToast("Harap Login Terlebih Dahulu!", true);
          }
        });
    };
    getUsers();
  }, [props, navigate, cookies.token]);
  if (isLoading) {
    return <></>;
  }

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
