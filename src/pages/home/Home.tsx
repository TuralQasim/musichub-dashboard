import React from "react";
import "./home.css";
import TracksContainer from "../../components/tracksContainer/TracksContainer";
import PortfolioContainer from "../../components/portfolioContainer/PortfolioContainer";

const Home = () => {
  return (
    <div className="container">
      <div className="home_page">
        <h2 >Tracks</h2>
        <TracksContainer />
      </div>
      <div className="home_page">
        <h2 >Portfolio</h2>
        <PortfolioContainer />
      </div>
    </div>
  );
};

export default Home;
