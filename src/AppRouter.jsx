import React, { Suspense } from "react";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EventDetails from "./pages/EventDeatails.jsx";
import Home from "./pages/Home.jsx";
import Login from "./Auth/login/Login.jsx";
import Signup from "./Auth/signup/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddEvent from "./pages/AddEvent.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import BookList from "./pages/BookList.jsx";
import Success from "./Components/Success/Success.jsx";

//const EventDetails = React.lazy(() => import("./pages/EventDeatails.jsx"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "event-details/:id",
        element: (
          //          <Suspense fallback="loading...........">
          <EventDetails />
          //          </Suspense>
        ),
      },
      { path: "dashboard", element: <Dashboard /> },
      { path: "dashboard/add", element: <AddEvent /> },
      { path: "eventlist", element: <BookList /> },
      { path: "congratulations", element: <Success /> },
    ],
    errorElement: <ErrorPage />,
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
]);

function AppRouter() {
  return <RouterProvider router={routes} />;
}

export default AppRouter;
