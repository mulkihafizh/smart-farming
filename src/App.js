import LandingPage from "./pages/landingPage";
import DashboardPage from "./pages/dashboard/dashboard";
import RegisterPage from "./pages/registerPage";
import LoginPage from "./pages/loginPage";
import CreateFarm from "./pages/dashboard/createFarm";
import Unauthorized from "./pages/errors/unauthorized";
import CreateSensor from "./pages/dashboard/sensorForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <LandingPage />
      </>
    ),
  },
  {
    path: "/register",
    element: (
      <>
        <RegisterPage />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <LoginPage />
      </>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <>
        <DashboardPage />
      </>
    ),
  },
  {
    path: "/tambah-lahan",
    element: (
      <>
        <CreateFarm />
      </>
    ),
  },
  {
    path: "/tambah-sensor/:farmId",
    element: (
      <>
        <CreateSensor />
      </>
    ),
  },
  {
    path: "/unable-to-access",
    element: (
      <>
        <Unauthorized />
      </>
    ),
  },
  {
    path: "*",
    element: (
      <>
        <h1>404</h1>
      </>
    ),
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
