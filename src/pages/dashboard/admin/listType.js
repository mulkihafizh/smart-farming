import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ListType() {
  const [data, setData] = useState({ types: [] });
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      await axios
        .get(process.env.REACT_APP_API_URL + "/type/all", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          navigate();
        });
    };
    getData();
  }, [navigate]);

  return (
    <>
      <div className="title">
        <h1>List Tipe</h1>
      </div>
      <table>
        <thead>
          <tr className="typerow">
            <th>Name</th>
            <th>Created At</th>
            <th>Jumlah Sensor</th>
          </tr>
        </thead>
        <tbody>
          {data.types.map((type) => {
            const date = new Date(type.createdAt);
            const formattedDate = date
              .toLocaleString("id-ID", {
                timeZone: "Asia/Jakarta",
                day: "numeric",
                month: "numeric",
                year: "numeric",
              })
              .replace(/\//g, "-");

            return (
              <tr className="typerow" key={type.id}>
                <td>{type.name}</td>
                <td>{formattedDate}</td>
                <td>{type.count}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
