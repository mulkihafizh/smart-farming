import LandingPage from "./pages/landingPage";
import DashboardPage from "./pages/dashboard/dashboard";
import RegisterPage from "./pages/registerPage";
import LoginPage from "./pages/loginPage";
import CreateFarm from "./pages/dashboard/createFarm";
import LoginFirst from "./pages/errors/loginFirst";
import CreateSensor from "./pages/dashboard/createSensor";
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
    path: "/tambah-sensor",
    element: (
      <>
        <CreateSensor />
      </>
    ),
  },
  {
    path: "/error-access",
    element: (
      <>
        <LoginFirst />
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
