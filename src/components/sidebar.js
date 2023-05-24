import React, { useState } from "react";

export default function Sidebar({ onSensorItemClick }) {
  const [handleSidebar, setSidebar] = useState(false);

  const handleSidebarClicked = () => {
    setSidebar((prevState) => !prevState);
  };

  return (
    <div className="leftSide">
      {handleSidebar ? (
        <div className="openSidebar" onClick={handleSidebarClicked}>
          <i class="fa-solid fa-bars"></i>
        </div>
      ) : (
        ""
      )}

      <div id="sidebar" className={`${handleSidebar ? "hideSidebar " : ""}`}>
        <div className="closeSidebar" onClick={handleSidebarClicked}>
          <i class="fa-solid fa-xmark"></i>
        </div>
        <div className="sidebarTitle">
          <p className="mainSideTitle">Smart Farming Tracker</p>
        </div>
        <div className="sidebarMenu">
          <div className="addFarmItem">
            <a href="/dashboard">
              <i className="fa-solid fa-plus"></i> <p>Tambah Lahan</p>
            </a>
          </div>
          <div className="farm">
            <p className="farmName">Farm 1</p>
            <div className="sideItems">
              <a href="/dashboard" className="itemTitle">
                <i className="fa-solid fa-screwdriver-wrench"></i>{" "}
                <p>Aktuator</p>
              </a>
            </div>
            <div className="sideItems">
              <div href="" className="itemTitle">
                <i className="fa-solid fa-gear"></i> <p>Sensor</p>
              </div>
              <div className="items">
                <p onClick={onSensorItemClick}>Water Flow</p>
                <p onClick={onSensorItemClick}>Water Meter</p>
                <p onClick={onSensorItemClick}>Water Ph</p>
                <p onClick={onSensorItemClick}>Soil Density</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
