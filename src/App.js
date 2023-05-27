import LandingPage from "./pages/landingPage";
import DashboardPage from "./pages/dashboard/dashboard";
import RegisterPage from "./pages/registerPage";
import LoginPage from "./pages/loginPage";
import CreateFarm from "./pages/dashboard/createFarm";
import LoginFirst from "./pages/errors/loginFirst";
import CreateSensor from "./pages/dashboard/createSensor";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";

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
<<<<<<< HEAD
    path: "/login",
    element: (
      <>
        <LoginPage />
      </>
    )
  },
  {
    path: "/register",
    element: (
      <>
        <RegisterPage />
      </>
    )
  }
=======
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
>>>>>>> f919affcbc82be9a3c94377c8cf7df5467d8d6e3
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
