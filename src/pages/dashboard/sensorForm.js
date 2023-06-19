import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../../assets/css/dashboard.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useParams } from "react-router-dom";
import Toast from "../../components/toast";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default function SensorFarm() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const { farmId } = useParams();
  const [name, setName] = useState("");
  const [guid, setGuid] = useState("");
  const options = ["Water Flow", "Water Meter", "Water pH", "Soil Moisture"];
  const [selectedOption, setSelectedOption] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isError, setIsError] = useState(false);
  let navigate = useNavigate();
  const [cookies] = useCookies(["userId"]);
  const [farm, setFarm] = useState({});

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleMapReady = () => {
    setMapLoaded(true);
  };

  useEffect(() => {
    if (!cookies.token) {
      navigate("/dashboard");
    }

    axios
      .get(process.env.REACT_APP_API_URL + `/farm/${farmId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          setFarm(res.data.farm);
          setMapLoaded(true);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/dashboard");
        }
        setIsError(true);
        setToastMessage(err.response.data.error);
        setShowToast(true);
      });
  }, [cookies.token, navigate, farmId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || selectedOption === "" || !guid) {
      setIsError(true);
      setToastMessage("Semua kolom harus diisi");
      setShowToast(true);
      return;
    }
    const data = {
      name: name,
      _guid: guid,
      type: selectedOption,
      _farm_id: farmId,
      _user_id: cookies.userId,
    };

    axios
      .post(process.env.REACT_APP_API_URL + "/sensor/create", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        setToastMessage(err.response.data.error);
        setShowToast(true);
      });
  };

  return (
    <div id="create">
      <Link to={`/dashboard`}>
        <i className="fa-solid fa-arrow-left backIcon"></i>
      </Link>
      {showToast && <Toast isError={isError} message={toastMessage} />}
      <div className="createForm">
        <div id="mapContainer" className="formDivided">
          <div className="createFormContainer">
            <div className="farmFormTitle">
              <h1>Sensor Farm</h1>
            </div>
            <div className="farmForm">
              <form id="farmInputForm">
                <div className="inputGroup">
                  <div className="inputGroup">
                    <label htmlFor="farmName">Sensor Name</label>
                    <input
                      type="text"
                      name="farmName"
                      id="farmName"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="farmGuid">GUID</label>
                    <input
                      type="text"
                      name="farmGuid"
                      id="farmGuid"
                      onChange={(e) => setGuid(e.target.value)}
                    />
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="farmType">Select Sensor</label>
                    <select
                      value={selectedOption}
                      onChange={handleSelectChange}
                      name="farmType"
                      id="farmType"
                    >
                      <option
                        disabled
                        hidden
                        value=""
                        style={{ color: "gray" }}
                      >
                        Choose Sensor
                      </option>
                      {options.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="farmSubmitButton">
                  <button onClick={handleSubmit}>Submit</button>
                </div>
              </form>
            </div>
          </div>

          {!mapLoaded && <div>Loading map...</div>}
          {mapLoaded && farm && farm.latitude && farm.longitude && (
            <MapContainer
              center={[
                farm.longitude.$numberDecimal,
                farm.latitude.$numberDecimal,
              ]}
              zoom={15}
              style={{ height: "100%", borderRadius: "20px" }}
              whenReady={handleMapReady}
              className="formMap"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution=""
              />
              <Marker
                position={[
                  farm.longitude.$numberDecimal,
                  farm.latitude.$numberDecimal,
                ]}
              >
                <Popup>
                  <div>
                    <h3>{farm.name}</h3>
                    <p>Longitude: {farm.longitude.$numberDecimal}</p>
                    <p>Latitude: {farm.latitude.$numberDecimal}</p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          )}
        </div>
      </div>
    </div>
  );
}
