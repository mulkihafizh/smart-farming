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
import ActuatorFarm from "./pages/dashboard/createActuator";
import ListType from "./pages/dashboard/admin/listType";
import { useState } from "react";
import Toast from "./components/toast";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  var [toast, setToast] = useState(null);
  var showToast = (message, type) => {
    setToast({ message: message, isError: type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return (
    <div className="App">
      <Toast toast={toast} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route
              path="/register"
              element={<RegisterPage showToast={showToast} />}
            />
            <Route
              path="/login"
              element={<LoginPage showToast={showToast} />}
            />
            <Route
              path="/dashboard"
              element={<DashboardPage showToast={showToast} />}
            />
            ,
            <Route
              path="/tambah-lahan"
              element={<CreateFarm showToast={showToast} />}
            />
            <Route
              path="/tambah-aktuator/:farmId"
              element={<ActuatorFarm showToast={showToast} />}
            />
            <Route
              path="/tambah-sensor/:farmId"
              element={<CreateSensor showToast={showToast} />}
            />
            <Route path="/unable-to-access" element={<Unauthorized />} />,
            <Route path="*" element={<h1>404</h1>} />
            <Route
              path="/admin-dashboard"
              element={<AdminPage showToast={showToast} />}
            >
              <Route index element={<ListUser />} />
              <Route
                path="/admin-dashboard/types"
                element={<ListType showToast={showToast} />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
