import React from "react"; // react
import "../css/Footer.css"; // custom css file

const Footer = ({ sidebarToggle }) => {
  const currentYear = new Date().getFullYear(); // year function

  return (
    <div className={sidebarToggle ? "footer" : "footer-collapse"}>
      <h1>IWS, {currentYear}. All Rights Reserved.</h1>
    </div>
  );
};

export default Footer;
