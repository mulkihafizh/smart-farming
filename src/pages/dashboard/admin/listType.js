import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ListType(props) {
  const [data, setData] = useState({ types: [] });
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (name === "") {
      props.showToast("Harus mengisi semua field", true);
      return;
    }
    const data = {
      name: name,
    };
    axios
      .post(process.env.REACT_APP_API_URL + "/type/create", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          props.showToast("Berhasil Menambahkan Tipe", false);
          setShowModal(false);
          setName("");
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
        }
      })
      .catch((err) => {
        props.showToast(err.response.data.err, true);
      });
  }

  function handleModal() {
    setShowModal(true);
  }

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
      {showModal ? (
        <div className="modal">
          <div className="modalWrap">
            <div className="modal-content">
              <span className="close" onClick={() => setShowModal(false)}>
                &times;
              </span>
              <h1> Tambah Tipe Sensor</h1>
              <div id="addType">
                <div className="formGroup">
                  <label htmlFor="name">Nama Tipe</label>
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="farmSubmitButton">
                  <button onClick={handleSubmit}>
                    <span>Submit</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="title typeTitle">
        <h1>List Tipe</h1>
        <div className="wrapTypeItems">
          <i className="fa-solid fa-plus"></i>{" "}
          <p onClick={handleModal}>Tambah Tipe</p>
        </div>
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
