import React from "react";
import "./Header.scss";
import Pfp from "../../Images/pfp.jpg";
import Logo from "../../Images/Logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="header_container">
        <div className="logo">
          <img src={Logo} alt="" />
          <h4>
            <Link to={""}>PassVault</Link>
          </h4>
        </div>
        <div className="personal_details">
          <button className="addPasswordBtn">
            <Link to={"/Important"}>
              <p>★</p>
            </Link>
          </button>
          <button className="profile">
            <Link to={"/login"}>
              <img src={Pfp} alt="" />
            </Link>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
