import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-4 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <p className="text-sm">
          © 2026 Employee Management System. All rights reserved.
        </p>

        {/* Right Section */}
        <p className="text-sm mt-2 md:mt-0">
          Made with <span className="text-red-500">❤️</span> by{" "}
          <span className="font-semibold text-white">Sujay</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
