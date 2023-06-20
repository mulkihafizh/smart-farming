import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import SideBar from "../../components/sidebar";
import "../../assets/css/dashboard.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate, Link, useLoaderData } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default function Dashboard() {
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [cookies, setCookie] = useCookies(["token"]);
  let navigate = useNavigate();
  const data = useLoaderData();
  console.log(data);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedSensors, setSelectedSensor] = useState([]);
  const [clickedSensor, setClickedSensor] = useState("");
  const [loggingOut, setLogout] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState([]);
  const [details, setDetails] = useState({});

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleFarmClick = (farm) => {
    const farmId = farm._id;
    setSelectedFarm((prevFarm) => (prevFarm === farm ? null : farm));
    const filteredSensor = data.sensor.filter(
      (sensor) => sensor._farm_id === farmId
    );
    setSelectedSensor(filteredSensor);
  };

  useEffect(() => {
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
    const selectedDetail = data.sensor.filter(
      (farm) => farm._id === sensorId
    )[0];
    setDetails(selectedDetail);
    const history = data.history.filter(
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
        process.env.REACT_APP_API_URL + "/user/signout",
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
        user={data.user}
      />
      <div className="rightSide">
        <header id="dashboardHead">
          <div className="searchInput">
            <input type="text" className="searchBar" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className="userProfile" onClick={handleProfileClick}>
            {data.user.username !== undefined ? (
              <>
                <p className="userName">
                  {data.user.username.charAt(0).toUpperCase() +
                    data.user.username.slice(1)}
                </p>
                <img
                  className="userProfilePic"
                  src={`https://ui-avatars.com/api/?name=${data.user.username}&background=random&color=fff&size=128&rounded=true&bold=true&font-size=0.33&length=1&uppercase=true&format=svg`}
                  alt="Profile "
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
                  {data.history.length > 0 || selectedHistory.length > 0 ? (
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
                    ))
                  ) : (
                    <div className="noHistory">
                      <p className="noHistoryText">
                        Tidak ada history ditemukan!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {data.farm.length === 0 && (
            <div className="noFarms">
              <p className="noFarmsText">Tidak ada lahan ditemukan!</p>
              <Link to="/tambah-lahan">
                <button className="addFarmButton">Tambah Lahan</button>
              </Link>
            </div>
          )}
          {data.farm.length > 0 && data.farm !== [] && (
            <MapContainer
              center={[
                parseFloat(data.farm[0].latitude.$numberDecimal),
                parseFloat(data.farm[0].longitude.$numberDecimal),
              ]}
              zoom={15}
              style={{ height: "100%", borderRadius: "20px" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution=""
              />
              {data.farm.length > 0 &&
                data.farm.map((farm, index) => {
                  return (
                    <Marker
                      key={index}
                      position={[
                        parseFloat(farm.latitude.$numberDecimal),
                        parseFloat(farm.longitude.$numberDecimal),
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
