import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar({
  selectedFarm,
  selectedSensor,
  selectedActuator,
  handleSensorItemClick,
  user,
}) {
  const [handleSidebar, setSidebar] = useState(true);
  const [clickedSensor, setClickedSensor] = useState(null);

  const handleSidebarClicked = () => {
    setSidebar((prevState) => !prevState);
  };
  const handleSensorClick = (sensorId) => {
    setClickedSensor(sensorId);
    handleSensorItemClick(sensorId);
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
            {user.role === "admin" && (
              <Link to={`/admin-dashboard`}>
                <i className="fa-solid fa-user"></i> <p>Admin Dashboard</p>
              </Link>
            )}

            <Link to={`/tambah-lahan`}>
              <i className="fa-solid fa-plus"></i> <p>Tambah Lahan</p>
            </Link>
          </div>
          {selectedFarm ? (
            <div className="farm">
              <p className="farmName">{selectedFarm.name}</p>
              <div className="sideItems">
                <Link
                  className="itemTitle"
                  to={`/tambah-aktuator/${selectedFarm._id}`}
                >
                  <i className="fa-solid fa-plus"></i> <p>Tambah Aktuator</p>
                </Link>
                <p className="itemTitle">
                  <i className="fa-solid fa-screwdriver-wrench"></i>{" "}
                  <p>Aktuator</p>
                </p>
              </div>
              {selectedActuator.length > 0 && (
                <div className="sideItems">
                  <Link
                    to={`/tambah-sensor/${selectedFarm._id}`}
                    className="itemTitle"
                  >
                    <i className="fa-solid fa-plus"></i> <p>Tambah Sensor</p>
                  </Link>
                  <div className="items">
                    <ul>
                      {selectedActuator.length > 0 &&
                        selectedActuator.map((actuator) => (
                          <li key={actuator._id}>
                            <p>{actuator.name}</p>
                            <p>{actuator.value}</p>
                          </li>
                        ))}
                      {selectedActuator.length === 0 && <p>Tidak ada sensor</p>}
                    </ul>
                  </div>
                </div>
              )}
              <div className="sideItems">
                <div href="" className="itemTitle">
                  <i className="fa-solid fa-gear"></i> <p>Sensor</p>
                </div>
                <div className="items">
                  <ul>
                    {selectedSensor.length > 0 &&
                      selectedSensor.map((sensor) => (
                        <li key={sensor._id}>
                          <p
                            onClick={() => handleSensorClick(sensor._id)}
                            className={
                              clickedSensor === sensor._id ? "selected" : ""
                            }
                          >
                            {sensor.name}
                          </p>
                        </li>
                      ))}
                    {selectedSensor.length === 0 && <p>Tidak ada sensor</p>}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <p className="farm">Tidak ada lahan yang dipilih</p>
          )}
        </div>
      </div>
    </div>
  );
}
