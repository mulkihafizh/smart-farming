import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../../assets/css/dashboard.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default function ActuatorFarm(props) {
  const { farmId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [farm, setFarm] = useState({});
  const options = [];
  const [name, setName] = useState("");
  const [guid, setGuid] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  let navigate = useNavigate();
  const [cookies] = useCookies(["userId"]);
  for (let i = 1; i <= 8; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    if (!cookies.token) {
      navigate("/dashboard");
    }

    const getData = async () => {
      await axios
        .get(process.env.REACT_APP_API_URL + `/farm/${farmId}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((res) => {
          setFarm(res.data.farm);
          setIsLoading(false);
        })
        .catch((err) => {
          props.showToast(err.response.data.error, true);
        });
    };
    getData();
  }, [cookies.token, navigate, farmId, props]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(name, selectedOption, guid, farmId, cookies.userId);
    if (!name || selectedOption === "" || !guid) {
      props.showToast("Harap isi semua field", true);
      return;
    }
    const data = {
      name: name,
      _guid: guid,
      value: selectedOption,
      _farm_id: farmId,
      _user_id: cookies.userId,
    };

    axios
      .post(process.env.REACT_APP_API_URL + "/actuator/create", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          navigate("/dashboard");
          props.showToast("Berhasil Menambahkan Aktuator", false);
        }
      })
      .catch((err) => {
        props.showToast(err.response.data.error, true);
      });
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <div id="create">
      <Link to={`/dashboard`}>
        <i className="fa-solid fa-arrow-left backIcon"></i>
      </Link>
      <div className="createForm">
        <div id="mapContainer" className="formDivided">
          <div className="createFormContainer">
            <div className="farmFormTitle">
              <h1>Actuator Farm</h1>
            </div>
            <div className="farmForm">
              <form id="farmInputForm">
                <div className="inputGroup">
                  <div className="inputGroup">
                    <label htmlFor="farmName">Actuator Name</label>
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
                    <label htmlFor="farmType">Select Value</label>
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
                      {options}
                    </select>
                  </div>
                </div>
                <div className="farmSubmitButton">
                  <button onClick={handleSubmit}>Submit</button>
                </div>
              </form>
            </div>
          </div>

          {farm && farm.latitude && farm.longitude && (
            <MapContainer
              center={[
                farm.latitude.$numberDecimal,
                farm.longitude.$numberDecimal,
              ]}
              zoom={15}
              style={{ height: "100%", borderRadius: "20px" }}
              className="formMap"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution=""
              />
              <Marker
                position={[
                  farm.latitude.$numberDecimal,
                  farm.longitude.$numberDecimal,
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
