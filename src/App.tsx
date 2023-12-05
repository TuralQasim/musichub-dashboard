import { Route, Routes } from "react-router-dom";
import React, { lazy, Suspense, useEffect, useState } from "react";
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
import axios from "axios";

type ComponentType = React.FC<{}>;
const App = () => {
  const [auth, setAuth] = useState<any>(null);
  const [loading, setLoading] = useState(true);
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
  const getData = async () => {
    try {
      const response = await axios.get(
        "https://api.music-hub.ru/account/current"
      );
      return response.data;
    } catch (error) {
      // Обработка ошибок, если необходимо
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setAuth(data);
      } finally {
        setLoading(false); // Установка loading в false независимо от результата
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : auth || isAuthenticated ? (
        <>
          <Header />
          <Sitebar />
          <Routes>
            {routes.map((t) => (
              <Route
                path={t.path}
                key={t.path}
                element={
                  <Suspense fallback={<Loading />}>{t.element}</Suspense>
                }
              />
            ))}
          </Routes>
        </>
      ) : (
        <Auth />
      )}
    </>
  );
};
export default App;
