import React from "react";

function Footer() {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <footer className="footer page__footer">
      <p className="footer__copyright">&copy; {year} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
