import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { FaMusic } from "react-icons/fa6";
import { RiLogoutBoxLine } from "react-icons/ri";
const Header = () => {
  return (
    <>
      <div className="header_bg">
        <div className="container">
          <header>
            <Link to="/" className="logo">
              <FaMusic />
              <p>Musichub</p>
            </Link>
            <Link to="/auth" className="login">
              <RiLogoutBoxLine />
            </Link>
          </header>
        </div>
      </div>
    </>
  );
};

export default Header;
