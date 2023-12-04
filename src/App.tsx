import { Route, Routes } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import Loading from "./components/Loading/Loading";
import Header from "./components/header/Header";
const Home = lazy(() => import("./pages/home/Home"));
const Auth = lazy(() => import("./pages/auth/Auth"));
const Register = lazy(() => import("./pages/register/Register"));
const CreatePortfolio = lazy(
  () => import("./pages/createPortfolio/CreatePortfolio")
);

import "./App.css";
import Sitebar from "./components/sitebar/Sitebar";
import { useSelector } from "react-redux";
import { RootState } from "./store";

type ComponentType = React.FC<{}>;
const App = () => {
  const routes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/auth",
      element: <Auth />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/create-portfolio",
      element: <CreatePortfolio />,
    },
  ];
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return (
    <>
      <Header />
      {isAuthenticated && <Sitebar />}
      <Routes>
        {routes.map((t) => (
          <Route
            path={t.path}
            key={t.path}
            element={<Suspense fallback={<Loading />}>{t.element}</Suspense>}
          />
        ))}
      </Routes>
    </>
  );
};
export default App;
