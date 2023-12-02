import React from "react";
import "./header.css";
import { useNavigate, Link } from "react-router-dom";
import { FaMusic } from "react-icons/fa6";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { TbLogin2 } from "react-icons/tb";
import { setAuth, setUser } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const logoutProfile = () => {
    dispatch(setAuth(false));
    dispatch(setUser(""));
    navigate("/");
  };
  return (
    <>
      <div className="header_bg">
        <div className="container">
          <header>
            <Link to="/" className="logo">
              <FaMusic />
              <p>Musichub</p>
            </Link>
            {user ? <h2 className="auth_user">{user}</h2> : ""}
            {!isAuthenticated ? (
              <Link to="/auth" className="login">
                <TbLogin2 />
                <p>Login</p>
              </Link>
            ) : (
              <button className="logout" onClick={logoutProfile}>
                <RiLogoutBoxLine />
                <p>Logout</p>
              </button>
            )}
          </header>
        </div>
      </div>
    </>
  );
};

export default Header;
