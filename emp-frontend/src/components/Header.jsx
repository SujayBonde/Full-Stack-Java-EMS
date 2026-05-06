import React from "react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / Title */}
        <h3 className="text-white text-xl md:text-2xl font-bold tracking-wide">
          Employee Management System
        </h3>
      </nav>
    </header>
  );
};

export default Header;
