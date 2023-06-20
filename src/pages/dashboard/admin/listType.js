import React from "react";
import { useLoaderData } from "react-router-dom";

export default function ListType() {
  const data = useLoaderData();
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
