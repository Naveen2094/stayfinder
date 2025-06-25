import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      © {new Date().getFullYear()} StayFinder. All rights reserved.
    </footer>
  );
}

export default Footer;
