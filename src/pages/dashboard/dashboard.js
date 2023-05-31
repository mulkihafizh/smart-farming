import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import SideBar from "../../components/sidebar";
import "../../assets/css/dashboard.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate, Link } from "react-router-dom";
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
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [cookies, setCookie] = useCookies(["token"]);
  let navigate = useNavigate();
  const [farmData, setFarmData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState([]);
  const [sensor, setSensor] = useState([]);
  const [selectedSensors, setSelectedSensor] = useState([]);
  const [clickedSensor, setClickedSensor] = useState("");
  const [details, setDetails] = useState(false);
  const [histories, setHistories] = useState([]);
  const [loggingOut, setLogout] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState([]);

  const handleMapReady = () => {
    setMapLoaded(true);
  };

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleFarmClick = (farm) => {
    const farmId = farm._id;
    setSelectedFarm((prevFarm) => (prevFarm === farm ? null : farm));
    const filteredSensor = sensor.filter(
      (sensor) => sensor._farm_id === farmId
    );
    setSelectedSensor(filteredSensor);
  };

  useEffect(() => {
    axios
      .get(
        "https://smartfarming-api-mulkihafizh.vercel.app/smart-farming/dashboard",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        setFarmData(res.data.farm);
        setUser(res.data.user);
        setSensor(res.data.sensor);
        setHistories(res.data.history);
        setCookie("userId", res.data.user._id, {
          path: "/",
          sameSite: "none",
          secure: true,
        });
        setLoaded(true);
      });

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
              setClickedSensor(null);
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

    return () => {
      observer.disconnect();
    };
  }, [cookies.token, navigate, setCookie]);

  const handleSensorItemClick = (sensorId) => {
    setClickedSensor((prevSensor) => (prevSensor === sensorId ? "" : sensorId));
    const selectedDetail = sensor.filter((farm) => farm._id === sensorId)[0];
    setDetails(selectedDetail);
    const history = histories.filter(
      (history) => history._sensor_id === sensorId
    );
    setSelectedHistory(history);
  };

  axios.defaults.withCredentials = true;
  const handleLogout = (e) => {
    e.preventDefault();
    setLogout(true);
    axios
      .post(
        "https://smartfarming-api-mulkihafizh.vercel.app/smart-farming/signout",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
          },
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          setCookie("userId", "", { path: "/", maxAge: 0 });
          setCookie("token", "", { path: "/", maxAge: 0 });
          navigate("/login");
        }
      });
  };

  return (
    <div className="mainContainer">
      {loggingOut && (
        <div className="loadingLogout">
          <div className="loadingcard">
            <p>Sedang logout...</p>
          </div>
        </div>
      )}
      <SideBar
        selectedSensor={selectedSensors}
        selectedFarm={selectedFarm}
        handleSensorItemClick={handleSensorItemClick}
      />
      <div className="rightSide">
        <header id="dashboardHead">
          <div className="searchInput">
            <input type="text" className="searchBar" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className="userProfile" onClick={handleProfileClick}>
            {user.username !== undefined ? (
              <>
                <p className="userName">
                  {user.username.charAt(0).toUpperCase() +
                    user.username.slice(1)}
                </p>
                <img
                  className="userProfilePic"
                  src="https://img.wattpad.com/5edad7765319cd862679ee6a481c19eadb22a39f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f3979324d3941414a6b64685359673d3d2d3838363634363239372e313630666132353063336133306534623333383235373633393935362e6a7067?s=fit&w=720&h=720"
                  alt=""
                />
              </>
            ) : (
              <p className="userName">Loading....</p>
            )}
          </div>
          {showDropdown && (
            <div className="dropdown">
              <button className="logoutButton" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </header>
        <div id="mapContainer" className={`${clickedSensor ? "divided" : ""}`}>
          {clickedSensor && details && (
            <div className="sensorDetails">
              <div className="sensorTitle">
                <p className="sensorName">{details.type}</p>
              </div>
              <div className="sensorData">
                <p className="historyMain">History :</p>
                <div className="historyItems">
                  {histories.length === 0 ||
                    (selectedHistory.length === 0 && <p>No History</p>)}
                  {histories.length > 0 &&
                    selectedHistory.length > 0 &&
                    selectedHistory.map((history) => (
                      <div className="historyItem" key={history._id}>
                        <p className="historyTitle">{history.title}</p>
                        <p className="historyDate">
                          {new Date(history.date)
                            .toLocaleDateString("id-ID", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                            .split(" ")
                            .join("-")}
                        </p>
                        <p className="historyDesc">{history.description}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
          {!loaded && !mapLoaded && (
            <div className="loadingMap">Loading map...</div>
          )}
          {farmData.length === 0 && loaded && (
            <div className="noFarms">
              <p className="noFarmsText">Tidak ada lahan ditemukan!</p>
              <Link to="/tambah-lahan">
                <button className="addFarmButton">Tambah Lahan</button>
              </Link>
            </div>
          )}
          {farmData.length > 0 && farmData !== [] && loaded === true && (
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
                      eventHandlers={{
                        click: () => handleFarmClick(farm),
                      }}
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
