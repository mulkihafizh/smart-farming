import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../../assets/css/dashboard.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default function CreateFarm() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const farmData = [
    {
      name: "Farm 1",
      latitude: -6.929556,
      longitude: 107.627139,
      sensors: [
        {
          name: "Water Flow",
          history: [
            {
              date: "2021-08-01",
              title: "Water Flow",
              description: "Water flow is normal",
            },
          ],
        },
        {
          name: "Water Meter",
          history: [
            {
              date: "2021-08-01",
              title: "Water Meter",
              description: "Water Meter is low",
            },
            {
              date: "2021-07-28",
              title: "Water Meter",
              description: "Water Meter is high",
            },
          ],
        },
        {
          name: "Water Ph",
          history: [
            {
              date: "2021-08-01",
              title: "Water Ph",
              description: "Water Ph is normal",
            },
          ],
        },
        {
          name: "Soil Density",
          history: [
            {
              date: "2021-08-01",
              title: "Soil Density",
              description: "Soil Density is normal",
            },
          ],
        },
      ],
    },
  ];

  const handleMapReady = () => {
    setMapLoaded(true);
  };
  return (
    <div id="create">
      <div className="createFarm">
        <div id="mapContainer" className="divided">
          <div className="createFormContainer">
            <div className="farmFormTitle">
              <h1>Create Farm</h1>
            </div>
            <div className="farmForm">
              <form method="POST" id="farmInputForm">
                <div className="inputGroup">
                  <div className="inputGroup">
                    <label htmlFor="farmName">Farm Name</label>
                    <input type="text" name="farmName" id="farmName" />
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="farmName">Luas Lahan</label>
                    <input type="text" name="farmName" id="farmName" />
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="farmName">Jenis Tanaman</label>
                    <input type="text" name="farmName" id="farmName" />
                  </div>
                  <div className="inputGroups">
                    <div className="inputGroup">
                      <label htmlFor="farmName">Jenis Tanaman</label>
                      <input type="text" name="farmName" id="farmName" />
                    </div>
                    <div className="inputGroup">
                      <label htmlFor="farmName">Jenis Tanaman</label>
                      <input type="text" name="farmName" id="farmName" />
                    </div>
                  </div>
                </div>
                <div className="farmSubmitButton">
                  <button type="submit" form="farmInputForm">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>

          {!mapLoaded && <div>Loading map...</div>}
          <MapContainer
            center={[-6.929543, 107.627141]}
            zoom={15}
            style={{ height: "100%", borderRadius: "20px" }}
            whenReady={handleMapReady}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution=""
            />
            {farmData.map((farm, index) => (
              <Marker key={index} position={[farm.latitude, farm.longitude]}>
                <Popup>
                  Name: {farm.name}
                  <br />
                  Latitude: {farm.latitude}
                  <br />
                  Longitude: {farm.longitude}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
