import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ selectedFarm, onSensorItemClick }) {
  const [handleSidebar, setSidebar] = useState(true);

  const handleSidebarClicked = () => {
    setSidebar((prevState) => !prevState);
  };
  const handleSensorClick = (sensorName) => {
    onSensorItemClick(sensorName);
  };

  return (
    <div className="leftSide">
      {handleSidebar ? (
        <div className="openSidebar" onClick={handleSidebarClicked}>
          <i className="fa-solid fa-bars"></i>
        </div>
      ) : (
        ""
      )}

      <div id="sidebar" className={`${handleSidebar ? "hideSidebar" : ""}`}>
        <div className="closeSidebar" onClick={handleSidebarClicked}>
          <i className="fa-solid fa-xmark"></i>
        </div>
        <div className="sidebarTitle">
          <p className="mainSideTitle">Smart Farming Tracker</p>
        </div>
        <div className="sidebarMenu">
          <div className="addFarmItem">
            <Link to={"/tambah-lahan"}>
              <i className="fa-solid fa-plus"></i> <p>Tambah Lahan</p>
            </Link>
          </div>
          {selectedFarm ? (
            <div className="farm">
              <p className="farmName">{selectedFarm.name}</p>
              <div className="sideItems">
                <a href="/dashboard" className="itemTitle">
                  <i className="fa-solid fa-screwdriver-wrench"></i>{" "}
                  <p>Aktuator</p>
                </a>
              </div>
              <div className="sideItems">
                <a href="/sensor-form" className="itemTitle">
                  <i className="fa-solid fa-plus"></i>{" "}
                  <p>Tambah Sensor</p>
                </a>
              </div>
              <div className="sideItems">
                <div href="" className="itemTitle">
                  <i className="fa-solid fa-gear"></i> <p>Sensor</p>
                </div>
                <div className="items">
                  <ul>
                    {selectedFarm.sensors.map((sensor, index) => (
                      <li key={index}>
                        <p onClick={() => handleSensorClick(sensor.name)}>
                          {sensor.name}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <p className="farm">No farm selected</p>
          )}
        </div>
      </div>
    </div>
  );
}
