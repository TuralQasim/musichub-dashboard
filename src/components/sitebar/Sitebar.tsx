import React from "react";
import "./sitebar.css";
import { FaMusic } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sitebar = () => {
  return (
    <div className="sitebar">
      <h2 className="sitebar_title">
        <FaMusic />
        Tracks
      </h2>
      <ul>
        <li>
          <Link to="">All tracks</Link>
        </li>
        <li>
          <Link to="">Create</Link>
        </li>
      </ul>
      <h2 className="sitebar_title">Portfolio</h2>
      <ul>
        <li>
          <Link to="">All portfolio</Link>
        </li>
        <li>
          <Link to="/create-portfolio">Create</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sitebar;
