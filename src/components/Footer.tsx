import React from "react";

const Footer = () => {
  const date = () => {
    return new Date().getFullYear();
  };

  return (
    <div className="container">
      <div className="footer-main">
        <span>Copyright &copy; {date()} IMPC All rights reserved!</span>
      </div>
    </div>
  );
};

export default Footer;
