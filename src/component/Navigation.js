import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {

  const linkStyles = {
    textDecoration: "none",
    fontWeight: "bold",
    color: "white",
    fontSize: "15px",
    fontFamily: "Open Sans",
  };

  return (
    <>
      <nav className="header">
        <ul>
          <Link to={"/"} style={linkStyles}>
            <li className="header">HOME</li>
          </Link>
          <Link to={"/dashboard"} style={linkStyles}>
            <li className="header">DASHBOARD</li>
          </Link>
          <Link to={"/contact"} style={linkStyles}>
            <li className="header">CONTACT</li>
          </Link>        
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
