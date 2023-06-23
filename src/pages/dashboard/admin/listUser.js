import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function ListUser() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    const getUsers = async () => {
      await axios
        .get(
          process.env.REACT_APP_API_URL +
            "/user/dashboard/admin/" +
            cookies.token,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setUsers(res.data.users);
          setIsLoading(false);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            navigate("/login");
          }
        });
    };
    getUsers();
  }, [navigate, cookies.token]);

  if (isLoading) {
    return <></>;
  }
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
