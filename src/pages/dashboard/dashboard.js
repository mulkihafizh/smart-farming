import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import SideBar from "../../components/sidebar";
import "../../assets/css/dashboard.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default function Dashboard() {
  const [mapLoaded, setMapLoaded] = useState(false);
  // const [selectedFarm, setSelectedFarm] = useState(null);
  const [sensorItemClicked, setSensorItemClicked] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [cookies] = useCookies(["token"]);
  let navigate = useNavigate();
  const [farmData, setFarmData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleMapReady = () => {
    setMapLoaded(true);
  };

  // const handleMarkerClick = (farm) => {
  //   if (selectedFarm !== farm) {
  //     setSelectedFarm(farm);
  //     setSelectedSensor(null);
  //     setSensorItemClicked(false);
  //   } else {
  //     setSensorItemClicked((prevValue) => !prevValue);
  //   }
  // };

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(
    () => async () => {
      const myData = axios.get(
        "https://smartfarming-api-mulkihafizh.vercel.app/smart-farming/dashboard",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await myData;
      setFarmData(data.data.farm);

      const mapContainer = document.getElementById("mapContainer");
      if (!cookies.token) {
        navigate("/login");
      }

      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === "childList") {
            const sensorDetails = mapContainer.querySelector(".sensorDetails");
            if (!sensorDetails) {
              console.log("Sensor details not found");
              try {
                setSelectedSensor(null);
              } catch (err) {
                console.log(err);
              }
            }
          }
        }
      });

      if (mapContainer) {
        observer.observe(mapContainer, { childList: true });
      }
      setLoaded(true);

      return () => {
        observer.disconnect();
      };
    },
    [cookies.token, navigate]
  );

  console.log("test");

  if (loaded && farmData) {
    console.log(!farmData[0].latitude.$numberDecimal);
  }

  const handleSensorItemClick = (sensorName) => {
    setSelectedSensor((prevSensor) =>
      prevSensor === sensorName ? null : sensorName
    );
    setSensorItemClicked((prevState) =>
      sensorName === selectedSensor ? !prevState : true
    );
  };
  axios.defaults.withCredentials = true;
  const handleLogout = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://smartfarming-api-mulkihafizh.vercel.app/smart-farming/signout",
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          navigate("/login");
        }
      });
  };

  return (
    <div className="mainContainer">
      <SideBar
        selectedSensor={selectedSensor}
        // selectedFarm={selectedFarm}
        onSensorItemClick={handleSensorItemClick}
      />
      <div className="rightSide">
        <header id="dashboardHead">
          <div className="searchInput">
            <input type="text" className="searchBar" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className="userProfile" onClick={handleProfileClick}>
            <p className="userName">Pendleton</p>
            <img
              className="userProfilePic"
              src="https://img.wattpad.com/5edad7765319cd862679ee6a481c19eadb22a39f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f3979324d3941414a6b64685359673d3d2d3838363634363239372e313630666132353063336133306534623333383235373633393935362e6a7067?s=fit&w=720&h=720"
              alt=""
            />
          </div>
          {showDropdown && (
            <div className="dropdown">
              <button className="logoutButton" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </header>
        <div
          id="mapContainer"
          className={`${sensorItemClicked ? "divided" : ""}`}
        >
          {sensorItemClicked && (
            <div className="sensorDetails">
              <div className="sensorTitle">
                <p className="sensorName">{selectedSensor}</p>
              </div>
              <div className="sensorData">
                <p className="historyMain">History :</p>
                <div className="historyItems">
                  {/* {selectedFarm.sensors.map((sensor) => {
                    if (sensor.name === selectedSensor) {
                      if (sensor.history.length === 0) {
                        return (
                          <p className="noHistory">
                            No history found on {selectedSensor}
                          </p>
                        );
                      } else {
                        return sensor.history.map((historyItem, index) => (
                          <div className="historyItem" key={index}>
                            <p className="historyTitle">{historyItem.title}</p>
                            <p className="historyDate">{historyItem.date}</p>

                            <p className="historyDesc">
                              {historyItem.description}
                            </p>
                          </div>
                        ));
                      }
                    }
                    return null;
                  })} */}
                </div>
              </div>
            </div>
          )}
          {!mapLoaded && <div>Loading map...</div>}
          {farmData.length === 0 && loaded && (
            <div className="noFarms">
              <p className="noFarmsText">No farms found</p>
              <button className="addFarmButton">Add Farm</button>
            </div>
          )}
          {farmData.length > 0 && loaded === true && (
            <MapContainer
              center={[
                parseFloat(farmData[0].longitude.$numberDecimal),
                parseFloat(farmData[0].latitude.$numberDecimal),
              ]}
              zoom={15}
              style={{ height: "100%", borderRadius: "20px" }}
              whenReady={handleMapReady}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution=""
              />
              {loaded &&
                farmData.length > 0 &&
                farmData.map((farm, index) => {
                  return (
                    <Marker
                      key={index}
                      position={[
                        parseFloat(farm.longitude.$numberDecimal),
                        parseFloat(farm.latitude.$numberDecimal),
                      ]}
                      // eventHandlers={{
                      //   click: () => handleMarkerClick(farm),
                      // }}
                    >
                      <Popup>
                        Name: {farm.name}
                        <br />
                        Latitude: {parseFloat(farm.latitude.$numberDecimal)}
                        <br />
                        Longitude: {parseFloat(farm.longitude.$numberDecimal)}
                      </Popup>
                    </Marker>
                  );
                })}
            </MapContainer>
          )}
        </div>
      </div>
    </div>
  );
}
