import LandingPage from "./pages/landingPage";
import DashboardPage from "./pages/dashboard/dashboard";
import RegisterPage from "./pages/registerPage";
import LoginPage from "./pages/loginPage";
import CreateFarm from "./pages/dashboard/createFarm";
import Unauthorized from "./pages/errors/unauthorized";
import CreateSensor from "./pages/dashboard/sensorForm";
import AdminPage from "./pages/dashboard/admin/adminDashboard";
import ListUser from "./pages/dashboard/admin/listUser";
import Layout from "./pages/layout";
import ListType from "./pages/dashboard/admin/listType";
import axios from "axios";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/register"
        loader={async () => {
          axios.defaults.withCredentials = true;

          if (document.cookie.token) {
            navigate("/dashboard");
          }

          await axios
            .get(process.env.REACT_APP_API_URL + "/user/authfalse", {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            })
            .catch((err) => {
              if (err.response.status === 401) {
                return (window.location.href = "/dashboard");
              }
            });

          return null;
        }}
        element={<RegisterPage />}
      />
      <Route
        path="/login"
        loader={async () => {
          if (document.cookie.token) {
            navigate("/dashboard");
          }
          axios.defaults.withCredentials = true;
          await axios
            .get(process.env.REACT_APP_API_URL + "/user/authfalse", {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            })
            .catch((err) => {
              if (err.response.status === 401) {
                return (window.location.href = "/dashboard");
              }
            });

          return null;
        }}
        element={<LoginPage />}
      />
      <Route
        path="/dashboard"
        loader={async () => {
          if (!document.cookie.token) {
            navigate("/login");
          }
          axios.defaults.withCredentials = true;
          const data = await axios
            .get(process.env.REACT_APP_API_URL + "/user/dashboard", {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            })
            .catch((err) => {
              if (err.response.status === 401) {
                return (window.location.href = "/unable-to-access");
              }
            });

          if (data.status === 200) {
            return data.data;
          }
          return null;
        }}
        element={<DashboardPage />}
      />
      ,
      <Route
        path="/tambah-lahan"
        loader={async () => {
          if (!document.cookie.token) {
            navigate("/login");
          }
          const data = await axios
            .get(process.env.REACT_APP_API_URL + "/user/check", {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            })
            .catch((err) => {
              if (err.response.status === 401) {
                return (window.location.href = "/unable-to-access");
              }
            });

          if (data.status === 200) {
            return data.data;
          }
          return (window.location.href = "/unable-to-access");
        }}
        element={<CreateFarm />}
      />
      <Route
        path="/tambah-sensor/:farmId"
        loader={async () => {
          if (!document.cookie.token) {
            navigate("/login");
          }
          const farmId = window.location.pathname.split("/");
          const data = await axios
            .get(process.env.REACT_APP_API_URL + "/farm/" + farmId[2], {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            })
            .catch((err) => {
              if (err.response.status === 401) {
                return (window.location.href = "/unable-to-access");
              }
            });

          const types = await axios
            .get(process.env.REACT_APP_API_URL + "/type/all", {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            })
            .catch((err) => {
              if (err.response.status === 401) {
                return (window.location.href = "/unable-to-access");
              }
            });

          const datas = {
            farm: data.data,
            types: types.data,
          };
          if (data.status === 200 && types.status === 200) {
            return datas;
          }
          return (window.location.href = "/unable-to-access");
        }}
        element={<CreateSensor />}
      />
      <Route path="/unable-to-access" element={<Unauthorized />} />,
      <Route path="*" element={<h1>404</h1>} />
      <Route path="/admin-dashboard" element={<AdminPage />}>
        <Route
          loader={async () => {
            if (!document.cookie.token) {
              navigate("/login");
            }
            const data = await axios
              .get(process.env.REACT_APP_API_URL + "/user/dashboard/admin", {
                withCredentials: true,
                headers: {
                  "Content-Type": "application/json",
                },
              })
              .catch((err) => {
                if (err.response.status === 401) {
                  return (window.location.href = "/unable-to-access");
                }
              });

            if (data.status === 200) {
              return data.data;
            }
            return window.location.href("/unable-to-access");
          }}
          index
          element={<ListUser />}
        />
        <Route
          path="/admin-dashboard/types"
          loader={async () => {
            const data = await axios
              .get(process.env.REACT_APP_API_URL + "/type/all", {
                withCredentials: true,
                headers: {
                  "Content-Type": "application/json",
                },
              })
              .catch((err) => {
                if (err.response.status === 401) {
                  return (window.location.href = "/unable-to-access");
                }
              });

            if (data.status === 200) {
              return data.data;
            }
            return window.location.href("/unable-to-access");
          }}
          element={<ListType />}
        />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
