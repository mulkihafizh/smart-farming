import React from "react";
import { useLoaderData } from "react-router-dom";

export default function ListUser() {
  const data = useLoaderData();
  const users = data.users;

  console.log(window.location.pathname);
  return (
    <>
      <div className="title">
        <h1>List User</h1>
      </div>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Jumlah Lahan</th>
            <th>Tanggal Dibuat</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const date = new Date(user.createdAt);
            const formattedDate = date
              .toLocaleString("id-ID", {
                timeZone: "Asia/Jakarta",
                day: "numeric",
                month: "numeric",
                year: "numeric",
              })
              .replace(/\//g, "-");

            return (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.farm}</td>
                <td>{formattedDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
