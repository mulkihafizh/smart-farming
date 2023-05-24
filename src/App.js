import LandingPage from "./pages/landingPage";
import DashboardPage from "./pages/dashboard/dashboard";
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
    path: "/dashboard",
    element: (
      <>
        <DashboardPage />
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
