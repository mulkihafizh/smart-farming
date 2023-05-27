import LandingPage from "./pages/landingPage";
import DashboardPage from "./pages/dashboard/dashboard";
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
    path: "/dashboard",
    element: (
      <>
        <DashboardPage />
      </>
    ),
  },
  {
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
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
