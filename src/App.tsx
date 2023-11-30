import { Route, Routes } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import Loading from "./components/Loading/Loading";
import Header from "./components/header/Header";
const Home = lazy(() => import("./pages/home/Home"));
const Auth = lazy(() => import("./pages/auth/Auth"));
import "./App.css";
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
  ];

  return (
    <>
      <Header />
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
