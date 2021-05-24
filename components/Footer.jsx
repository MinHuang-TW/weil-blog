import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <small>Copyright {year}</small>
    </footer>
  );
};

export default Footer;
